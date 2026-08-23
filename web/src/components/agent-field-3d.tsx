"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function Field() {
  const ref=useRef<THREE.Points>(null);
  const positions=useMemo(()=>{const width=86,depth=42;const a=new Float32Array(width*depth*3);let p=0;for(let z=0;z<depth;z++)for(let x=0;x<width;x++){const nx=(x-width/2)/7;const nz=(z-depth/2)/6;const rise=Math.exp(-((nx+1.8)**2)/7)*4.2+Math.exp(-((nx-3.3)**2)/3.5)*2.5;const ripple=Math.sin(nx*1.3+nz*.8)*.28;a[p++]=nx;a[p++]=rise+ripple-2.6;a[p++]=nz;}return a},[]);
  useFrame(({clock})=>{if(ref.current)ref.current.rotation.y=Math.sin(clock.elapsedTime*.12)*.035});
  return <points ref={ref} position={[0,1.2,0]} rotation={[-.12,0,0]}><bufferGeometry><bufferAttribute attach="attributes-position" args={[positions,3]}/></bufferGeometry><pointsMaterial color="#f7fbff" size={.075} transparent opacity={.92} sizeAttenuation/></points>;
}
export function AgentField3D(){return <div className="absolute inset-x-0 bottom-0 h-[62%] overflow-hidden rounded-b-[34px]" aria-hidden><Canvas camera={{position:[0,2.2,12],fov:48}} dpr={[1,1.5]} gl={{antialias:true,alpha:true}}><fog attach="fog" args={["#174db4",10,26]}/><Field/></Canvas><div className="absolute inset-x-[-5%] bottom-[-28%] h-[82%] rotate-[-5deg] opacity-45 [background-image:radial-gradient(circle,rgba(255,255,255,.9)_1.2px,transparent_1.4px)] [background-size:13px_13px] [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_72%)]"/><div className="absolute inset-0 bg-gradient-to-t from-[#1649a8]/10 via-transparent to-[#215bd0]/20"/></div>}
