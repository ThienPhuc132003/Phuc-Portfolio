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
 const navy=material(0x213a62),dark=material(0x172338),red=material(0xd93648),skin=material(0xf5c0a4),white=material(0xfff9ee),black=material(0x101725,.25),blue=material(0x86b7da);
 const sphere=(mat,x,y,z,sx,sy,sz)=>{const m=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);character.add(m);return m};
 const capsule=(mat,a,b,r)=>{const start=new THREE.Vector3(...a),end=new THREE.Vector3(...b),delta=end.clone().sub(start);const m=new THREE.Mesh(new THREE.CapsuleGeometry(r,Math.max(.01,delta.length()-2*r),8,16),mat);m.position.copy(start).add(end).multiplyScalar(.5);m.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),delta.normalize());character.add(m);return m};
 // Abstract toy-like form: a rounded blue body, large eyes, round glasses and parted hair.
 sphere(navy,0,-.65,0,.95,1.08,.65);sphere(blue,0,-.45,.49,.74,.58,.2);
 sphere(skin,0,.78,.12,.82,.74,.58);sphere(skin,-.79,.73,.1,.16,.24,.16);sphere(skin,.79,.73,.1,.16,.24,.16);
 for(const x of [-.34,.34]){sphere(white,x,.8,.63,.28,.31,.13);sphere(black,x,.78,.75,.12,.15,.08);sphere(white,x-.035,.84,.82,.035,.045,.025);const frame=new THREE.Mesh(new THREE.TorusGeometry(.30,.027,10,48),dark);frame.position.set(x,.8,.72);character.add(frame)}
 capsule(dark,[-.04,.8,.73],[.04,.8,.73],.035);
 const hairL=sphere(dark,-.39,1.32,.23,.49,.32,.48);hairL.rotation.z=-.4;const hairR=sphere(dark,.39,1.32,.23,.49,.32,.48);hairR.rotation.z=.4;sphere(dark,0,1.36,-.12,.76,.25,.49);
 sphere(red,-.78,-.65,.02,.24,.36,.25);sphere(red,.78,-.65,.02,.24,.36,.25);capsule(red,[-.82,-.65,.03],[-1.11,-1.09,.15],.15);capsule(red,[.82,-.65,.03],[1.12,-.95,.17],.15);sphere(skin,-1.12,-1.12,.16,.16,.17,.15);sphere(skin,1.13,-.97,.17,.16,.17,.15);
 capsule(navy,[-.43,-1.4,0],[-.46,-1.93,.08],.17);capsule(navy,[.43,-1.4,0],[.46,-1.93,.08],.17);sphere(dark,-.48,-2.03,.2,.32,.16,.36);sphere(dark,.48,-2.03,.2,.32,.16,.36);
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
