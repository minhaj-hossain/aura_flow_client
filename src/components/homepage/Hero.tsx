"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { Check } from "lucide-react";

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let animationFrameId: number;
    const gl = (canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl")) as WebGLRenderingContext | null;
    if (!gl) return;

    // Handle high-DPI displays and resizing
    const resizeCanvas = () => {
      const displayWidth = canvas.clientWidth;
      const displayHeight = canvas.clientHeight;
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
    };

    // Initialize ResizeObserver
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    resizeObserver.observe(canvas);
    resizeCanvas();

    // Vertex Shader code
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader code
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      void main() {
        vec2 uv = v_texCoord;
        vec2 mouse = u_mouse / u_resolution;
        
        // Flowing gradient pattern
        float noise = sin(uv.x * 3.5 + u_time * 0.4) * cos(uv.y * 3.5 - u_time * 0.3);
        float dist = distance(uv, mouse);
        
        vec3 colorBg = vec3(0.04, 0.04, 0.06); // Deep Charcoal #0A0A0F
        vec3 colorSubtle = vec3(0.08, 0.08, 0.12); // Subtle Blue-Grey
        vec3 colorAccent = vec3(0.25, 0.27, 0.75); // Electric Indigo
        
        vec3 base = mix(colorBg, colorSubtle, uv.y + noise * 0.15);
        vec3 finalColor = mix(base, colorAccent, (1.0 - smoothstep(0.0, 0.7, dist)) * 0.22);
        
        gl_FragColor = vec4(finalColor, 1.0);
      }
    `;

    // Compile shader helper
    const compileShader = (
      type: number,
      source: string,
    ): WebGLShader | null => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Shader compilation error:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, vsSource);
    const fs = compileShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Setup screen-aligned quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionLoc = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLoc);
    gl.vertexAttribPointer(positionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, "u_time");
    const uResolutionLoc = gl.getUniformLocation(program, "u_resolution");
    const uMouseLoc = gl.getUniformLocation(program, "u_mouse");

    // Default mouse position at center
    const mouse = { x: canvas.width / 2, y: canvas.height / 2 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mouse.x = nx * canvas.width;
        mouse.y = ny * canvas.height;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Main rendering loop
    const render = (time: number) => {
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);

      if (uTimeLoc) gl.uniform1f(uTimeLoc, time * 0.001);
      if (uResolutionLoc)
        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      if (uMouseLoc) gl.uniform2f(uMouseLoc, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Clean up resources on unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(positionBuffer);
    };
  }, []);

  return (
    <header className="relative pt-32 pb-24 md:pt-44 md:pb-32 overflow-hidden flex flex-col justify-center min-h-[80vh] md:min-h-[85vh] w-full bg-[#0a0a0b]">
      {/* Dynamic WebGL Canvas Background */}
      <div className="absolute inset-0 w-full h-full z-0 select-none pointer-events-none">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full block"
        />
      </div>

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-16 text-center lg:text-left z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        {/* Left column: Text Content */}
        <div className="lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#6366f1]/10 text-[#c0c1ff] rounded-full font-sans text-[12px] font-semibold tracking-wider mb-6 border border-[#6366f1]/20">
            <Check className="w-4 h-4 text-[#10b981]" />
            <span>TRUSTED BY 2,000+ GLOBAL TEAMS</span>
          </div>

          {/* Display Heading */}
          <h1 className="font-display text-[36px] sm:text-[48px] lg:text-[54px] xl:text-[60px] font-bold text-white mb-6 tracking-tight leading-[1.1] lg:leading-[1.15] w-full">
            The Future of Workflow Intelligence
          </h1>

          {/* Supporting Copy */}
          <p className="font-sans text-[16px] sm:text-[18px] text-[#e1e3e4]/80 mb-8 leading-relaxed font-light max-w-xl">
            Empower your team with next-generation tools designed for clarity,
            speed, and scale. Experience the harmony of integrated data and
            creative freedom.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 w-full sm:w-auto">
            <button className="w-full sm:w-auto px-10 py-4 bg-white text-[#0a0a0b] rounded-xl font-sans text-[14px] font-semibold tracking-wider hover:bg-[#e1e3e4] transition-all duration-300 shadow-xl hover:shadow-[0_8px_30px_rgba(255,255,255,0.1)] cursor-pointer active:scale-95">
              Start for Free
            </button>
            <button className="w-full sm:w-auto px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-xl font-sans text-[14px] font-semibold tracking-wider hover:bg-white/15 transition-all duration-300 cursor-pointer active:scale-95">
              Book a Demo
            </button>
          </div>
        </div>

        {/* Right column: Mockup Dashboard Frame */}
        <div className="lg:col-span-6 w-full relative">
          <div className="rounded-[24px] sm:rounded-[32px] overflow-hidden shadow-[0_32px_64px_rgba(0,0,0,0.5)] border border-white/10 bg-black/40 backdrop-blur-sm p-1.5 sm:p-2.5 max-w-2xl mx-auto lg:mx-0">
            <div className="relative rounded-[18px] sm:rounded-[24px] overflow-hidden aspect-[16/10]">
              <Image
                className="w-full h-full object-cover"
                alt="A high-fidelity dashboard interface display with glassmorphic panels, featuring intricate data visualizations, glowing blue line charts, and circular progress indicators. The aesthetic is clean and modern, using a light-mode palette of soft grays and crisp whites with vibrant sapphire blue accents."
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuA-EkMaEuSJ1G1bfyBepINu9--sP832RxLcPg4HirINcdMbpuacnsxVHPv8MnaVdO5gskB61i4m6rRHfC8Zr9u9m_hSS0iDnk4Qgz5bTtcvBeMAci4fFTE3gs7e6r0t9ZOd5PCCW0jwk1XgF-43o1wGq1vaGrPDmQwh5Dmv0pLmwaLkof4XwA2BkLT7DtXRWJIRQMSffa9Tv9sFvtt2h6c6aM7AXcpLsoPFuugVodaHTR0lDwjfyOqX"
                fill
                priority
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
