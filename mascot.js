import * as THREE from './vendor/three.module.js';
const slot=document.querySelector('.mascot-slot');
const canvas=document.querySelector('#mascot-canvas');
const trigger=document.querySelector('.tutor-image-wrap');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');
try{
 const renderer=new THREE.WebGLRenderer({canvas,alpha:true,antialias:true,powerPreference:'low-power'});
 renderer.setPixelRatio(Math.min(devicePixelRatio,1.5));
 const scene=new THREE.Scene();const camera=new THREE.OrthographicCamera(-2,2,2.7,-2.7,.1,40);camera.position.set(0,0,12);camera.lookAt(0,0,0);
 const character=new THREE.Group();scene.add(character);
 const material=(color,roughness=.34)=>new THREE.MeshStandardMaterial({color,roughness,metalness:.08});
 const navy=material(0x293d58),dark=material(0x17191f),skin=material(0xe9b69a),white=material(0xf3f2ea),black=material(0x17181c,.25),blue=material(0x416e9c),hair=material(0x202025,.55),lip=material(0x9c6456);
 const sphere=(mat,x,y,z,sx,sy,sz)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);character.add(m);return m};
 const capsule=(mat,a,b,r)=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);const m=new THREE.Mesh(new THREE.CapsuleGeometry(r,Math.max(.01,delta.length()-2*r),8,16),mat);m.position.copy(start).add(end).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());character.add(m);return m};
 // A stylized, fully 3D mascot based on the reference: center-parted dark hair, glasses and a blue-and-white raglan shirt.
 sphere(white,0,-.65,0,.73,.87,.46);sphere(blue,0,-.15,.02,.54,.21,.44);
 sphere(skin,0,.78,.12,.78,.72,.56);sphere(skin,-.73,.67,.12,.13,.20,.13);sphere(skin,.73,.67,.12,.13,.20,.13);
 for(const x of [-.31,.31]){sphere(white,x,.82,.62,.245,.22,.09);sphere(black,x,.81,.705,.095,.115,.06);sphere(white,x-.025,.85,.756,.025,.03,.015);const frame=new THREE.Mesh(new THREE.TorusGeometry(.27,.026,10,48),dark);frame.position.set(x,.82,.68);frame.scale.y=.92;character.add(frame)}
 capsule(dark,[-.04,.82,.70],[.04,.82,.70],.025);sphere(skin,0,.56,.68,.07,.08,.06);
 const smile=new THREE.Mesh(new THREE.TorusGeometry(.16,.018,8,32,Math.PI),lip);smile.rotation.z=Math.PI;smile.position.set(0,.40,.66);character.add(smile);
 sphere(hair,0,1.22,-.02,.79,.42,.55);
 const hairL=sphere(hair,-.37,1.31,.34,.44,.27,.30);hairL.rotation.z=-.36;
 const hairR=sphere(hair,.37,1.31,.34,.44,.27,.30);hairR.rotation.z=.36;
 const lockL=sphere(hair,-.53,1.15,.38,.24,.28,.20);lockL.rotation.z=-.5;
 const lockR=sphere(hair,.53,1.15,.38,.24,.28,.20);lockR.rotation.z=.5;
 capsule(blue,[-.62,-.30,.02],[-.85,-1.06,.12],.18);capsule(blue,[.62,-.30,.02],[.85,-1.06,.12],.18);
 sphere(skin,-.87,-1.10,.13,.14,.16,.13);sphere(skin,.87,-1.10,.13,.14,.16,.13);
 capsule(navy,[-.34,-1.31,0],[-.38,-1.95,.08],.16);capsule(navy,[.34,-1.31,0],[.38,-1.95,.08],.16);
 sphere(dark,-.40,-2.02,.19,.28,.14,.32);sphere(dark,.40,-2.02,.19,.28,.14,.32);
 scene.add(new THREE.HemisphereLight(0xffffff,0x607291,2.5));const key=new THREE.DirectionalLight(0xffffff,3);key.position.set(-3,5,8);scene.add(key);const rim=new THREE.DirectionalLight(0xf4a3af,1.5);rim.position.set(4,1,2);scene.add(rim);
 let frame=0,visible=true;const pointer={x:0,y:0},clock=new THREE.Clock();
 function resize(){const w=slot.clientWidth,h=slot.clientHeight;if(!w||!h)return;renderer.setSize(w,h,false);const half=2.65;camera.top=half;camera.bottom=-half;camera.left=-half*w/h;camera.right=half*w/h;camera.updateProjectionMatrix();renderer.render(scene,camera)}
 function draw(){frame=0;if(!visible||document.hidden||reduced.matches)return;const t=clock.getElapsedTime();character.rotation.y+=((pointer.x*.28)-character.rotation.y)*.06;character.rotation.x+=((-pointer.y*.12)-character.rotation.x)*.06;character.position.y=Math.sin(t*1.3)*.045;renderer.render(scene,camera);frame=requestAnimationFrame(draw)}
 function start(){if(!frame&&visible&&!document.hidden&&!reduced.matches)frame=requestAnimationFrame(draw)}
 new ResizeObserver(resize).observe(slot);new IntersectionObserver(([e])=>{visible=e.isIntersecting;start()}).observe(slot);
 trigger.addEventListener('pointermove',e=>{const r=trigger.getBoundingClientRect();pointer.x=(e.clientX-r.left)/r.width-.5;pointer.y=(e.clientY-r.top)/r.height-.5});trigger.addEventListener('pointerleave',()=>{pointer.x=0;pointer.y=0});document.addEventListener('visibilitychange',start);
 reduced.addEventListener('change',()=>{if(reduced.matches){cancelAnimationFrame(frame);frame=0;character.rotation.set(0,0,0);character.position.y=0;renderer.render(scene,camera)}else start()});
 canvas.addEventListener('webglcontextlost',e=>{e.preventDefault();cancelAnimationFrame(frame);frame=0;slot.classList.remove('is-rendered')});resize();slot.classList.add('is-rendered');start();
}catch(error){console.warn('Mascot 3D unavailable; static fallback shown.',error)}
