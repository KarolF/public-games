var xu=Object.defineProperty;var vu=(r,e,t)=>e in r?xu(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var w=(r,e,t)=>vu(r,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const s of i)if(s.type==="childList")for(const a of s.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function t(i){const s={};return i.integrity&&(s.integrity=i.integrity),i.referrerPolicy&&(s.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?s.credentials="include":i.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(i){if(i.ep)return;i.ep=!0;const s=t(i);fetch(i.href,s)}})();const _a=["rifle","shotgun","rocket"];class mc{constructor(e,t,n,i){w(this,"activeKeys",new Set);w(this,"commandState",{aim:{x:0,z:30},fire:!1,moveX:0,moveZ:0,weapon:"rifle"});w(this,"sticks",document.querySelectorAll("[data-stick]"));w(this,"weaponButtons",document.querySelectorAll("[data-weapon]"));w(this,"crosshair");w(this,"ownsCrosshair");w(this,"moveVector",{x:0,z:0});w(this,"aimVector",{x:0,z:-1});w(this,"movePointerId",null);w(this,"aimPointerId",null);w(this,"mouseFiring",!1);w(this,"touchFiring",!1);this.canvas=e,this.pointerToWorld=t,this.playerPosition=n,this.onWeaponChanged=i;const s=document.querySelector("#crosshair");s?(this.crosshair=s,this.ownsCrosshair=!1):(this.crosshair=mc.createCrosshair(),this.ownsCrosshair=!0),this.onKeyDown=this.onKeyDown.bind(this),this.onKeyUp=this.onKeyUp.bind(this),this.onPointerDown=this.onPointerDown.bind(this),this.onPointerMove=this.onPointerMove.bind(this),this.onPointerUp=this.onPointerUp.bind(this),this.onStickDown=this.onStickDown.bind(this),this.onStickMove=this.onStickMove.bind(this),this.onStickEnd=this.onStickEnd.bind(this),this.onWeaponDown=this.onWeaponDown.bind(this),this.onBlur=this.onBlur.bind(this),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp),window.addEventListener("pointerup",this.onPointerUp),window.addEventListener("blur",this.onBlur),this.canvas.addEventListener("pointerdown",this.onPointerDown),this.canvas.addEventListener("pointermove",this.onPointerMove);for(const a of this.sticks)a.addEventListener("pointerdown",this.onStickDown),a.addEventListener("pointermove",this.onStickMove),a.addEventListener("pointerup",this.onStickEnd),a.addEventListener("pointercancel",this.onStickEnd);for(const a of this.weaponButtons)a.addEventListener("pointerdown",this.onWeaponDown);this.syncWeaponButtons()}get command(){if(this.updateMovement(),this.touchFiring){const e=this.playerPosition();this.commandState.aim.x=e.x+this.aimVector.x*30,this.commandState.aim.z=e.z+this.aimVector.z*30}return this.commandState.fire=this.mouseFiring||this.touchFiring,this.commandState}dispose(){window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("keyup",this.onKeyUp),window.removeEventListener("pointerup",this.onPointerUp),window.removeEventListener("blur",this.onBlur),this.canvas.removeEventListener("pointerdown",this.onPointerDown),this.canvas.removeEventListener("pointermove",this.onPointerMove);for(const e of this.sticks)e.removeEventListener("pointerdown",this.onStickDown),e.removeEventListener("pointermove",this.onStickMove),e.removeEventListener("pointerup",this.onStickEnd),e.removeEventListener("pointercancel",this.onStickEnd);for(const e of this.weaponButtons)e.removeEventListener("pointerdown",this.onWeaponDown);this.ownsCrosshair&&this.crosshair.remove()}clearHeldInput(){this.activeKeys.clear(),this.mouseFiring=!1,this.touchFiring=!1,this.moveVector.x=0,this.moveVector.z=0}resetForLevel(e,t){this.clearHeldInput(),this.movePointerId=null,this.aimPointerId=null,this.aimVector.x=0,this.aimVector.z=-1,this.commandState.aim.x=e.x,this.commandState.aim.z=e.z-30,this.commandState.moveX=0,this.commandState.moveZ=0,this.commandState.fire=!1,this.commandState.weapon=t,this.syncWeaponButtons(),this.hideCrosshair();for(const n of this.sticks){const i=n.querySelector(".stick-knob");i&&(i.style.transform="")}}onKeyDown(e){this.activeKeys.add(e.code),e.code==="Digit1"&&this.selectWeapon(0),e.code==="Digit2"&&this.selectWeapon(1),e.code==="Digit3"&&this.selectWeapon(2);const t=_a.indexOf(this.commandState.weapon);e.code==="KeyQ"&&this.selectWeapon((t+2)%3),e.code==="KeyE"&&this.selectWeapon((t+1)%3)}onKeyUp(e){this.activeKeys.delete(e.code)}onPointerDown(e){e.pointerType!=="mouse"||e.button!==0||(this.mouseFiring=!0,this.updateMouseAim(e))}onPointerMove(e){e.pointerType==="mouse"&&this.updateMouseAim(e)}onPointerUp(e){e.pointerType==="mouse"&&(this.mouseFiring=!1)}updateMouseAim(e){const t=this.pointerToWorld(e.clientX,e.clientY);t&&(this.commandState.aim.x=t.x,this.commandState.aim.z=t.z,this.showCrosshair(e.clientX,e.clientY))}onStickDown(e){e.preventDefault();const t=e.currentTarget;t instanceof HTMLElement&&(t.dataset.stick==="move"&&(this.movePointerId=e.pointerId),t.dataset.stick==="aim"&&(this.aimPointerId=e.pointerId),t.setPointerCapture(e.pointerId),this.updateStick(t,e))}onStickMove(e){const t=e.currentTarget;t instanceof HTMLElement&&this.updateStick(t,e)}updateStick(e,t){const n=e.dataset.stick==="move",i=n?this.movePointerId:this.aimPointerId;if(t.pointerId!==i)return;const s=e.getBoundingClientRect(),a=s.width*.24,o=t.clientX-(s.left+s.width/2),c=t.clientY-(s.top+s.height/2),l=Math.min(1,a/Math.max(1,Math.hypot(o,c))),h=n?this.moveVector:this.aimVector;h.x=o*l/a,h.z=c*l/a;const d=e.querySelector(".stick-knob");d&&(d.style.transform=`translate(${h.x*a}px, ${h.z*a}px)`),n||(this.touchFiring=Math.hypot(h.x,h.z)>.18)}onStickEnd(e){const t=e.currentTarget;if(!(t instanceof HTMLElement))return;const n=t.dataset.stick==="move",i=n?this.movePointerId:this.aimPointerId;if(e.pointerId!==i)return;n?this.movePointerId=null:this.aimPointerId=null;const s=n?this.moveVector:this.aimVector;s.x=0,s.z=0;const a=t.querySelector(".stick-knob");a&&(a.style.transform=""),n||(this.touchFiring=!1)}onWeaponDown(e){e.preventDefault();const t=e.currentTarget;t instanceof HTMLButtonElement&&this.selectWeapon(Number(t.dataset.weapon))}selectWeapon(e){const t=_a[e];!t||t===this.commandState.weapon||(this.commandState.weapon=t,this.syncWeaponButtons(),this.onWeaponChanged(t))}syncWeaponButtons(){const e=_a.indexOf(this.commandState.weapon);for(const t of this.weaponButtons){const n=Number(t.dataset.weapon);t.classList.toggle("active",n===e)}}showCrosshair(e,t){const n=this.crosshair.style;n.left=`${e}px`,n.top=`${t}px`,n.display="block"}hideCrosshair(){this.crosshair.style.display="none"}static createCrosshair(){const e=document.createElement("div");return e.id="crosshair",e.className="crosshair",e.setAttribute("aria-hidden","true"),document.body.append(e),e}updateMovement(){const e=this.activeKeys,t=Number(e.has("KeyD")||e.has("ArrowRight"))-Number(e.has("KeyA")||e.has("ArrowLeft"))+this.moveVector.x,n=Number(e.has("KeyS")||e.has("ArrowDown"))-Number(e.has("KeyW")||e.has("ArrowUp"))+this.moveVector.z,i=Math.max(1,Math.hypot(t,n));this.commandState.moveX=t/i,this.commandState.moveZ=n/i}onBlur(){this.clearHeldInput()}}function ln(r){return r==="boss_tank"||r==="boss_crawler"||r==="boss_mech"}function Bt(r,e){const t=r.x-e.x,n=r.z-e.z;return t*t+n*n}function Ri(r,e,t){const n=t.x-e.x,i=t.z-e.z,s=n*n+i*i;if(s===0)return Bt(r,e);const a=r.x-e.x,o=r.z-e.z,c=Math.max(0,Math.min(1,(a*n+o*i)/s)),l={x:e.x+n*c,z:e.z+i*c};return Bt(r,l)}const ai=1,Su=1.5,yu=24,Mu=.8,ul=3.5,fl=12,Eu=100,bu=1,Tu=26,wu=40,Au="rifle";class Ru{createCommand(e){const t=this.findTarget(e),n=t?.position??this.getForwardAim(e.player.position),i=Au;return{aim:n,fire:e.mission.status!=="level-transition"&&t!==void 0,moveX:this.getMoveX(e),moveZ:this.getMoveZ(e,t),weapon:i}}findTarget(e){let t,n=Number.POSITIVE_INFINITY;for(const i of e.enemies){const s=Bt(i.position,e.player.position);if(ln(i.kind))return i;s<n&&(t=i,n=s)}return t}getMoveX(e){const t=e.player,n=t.position;if(n.x<-fl)return ai;if(n.x>fl)return-ai;const i=this.getDodgeDirection(e);if(i!==0)return i;const s=this.findHealthPickup(e);return s&&t.health<Eu&&Math.abs(s.position.x-n.x)>bu?this.getHorizontalDirection(s.position.x,n.x):this.getSweepDirection(e.elapsedSeconds)}getHorizontalDirection(e,t){return e>t?ai:-ai}getSweepDirection(e){return Math.sin(e*Su)>=0?ai:-ai}getDodgeDirection(e){const t=e.player.position;for(const n of e.projectiles){if(n.kind!=="enemy")continue;const i=n.velocity;if(i.z<=0)continue;const s=n.position,a=Math.max(0,Math.min(Mu,(t.z-s.z)/i.z)),o=s.x+i.x*a,c=s.z+i.z*a,l=Math.abs(c-t.z)<ul,h=Math.abs(o-t.x)<ul;if(l&&h)return o>=t.x?-ai:ai}return 0}findHealthPickup(e){let t,n=Number.POSITIVE_INFINITY;for(const i of e.pickups){if(i.kind!=="health")continue;const s=Bt(i.position,e.player.position);s<n&&(t=i,n=s)}return t}getMoveZ(e,t){if(t===void 0)return-1;const n=Math.sqrt(Bt(t.position,e.player.position));return ln(t.kind)&&n<wu||!ln(t.kind)&&n<Tu?1:-1}getForwardAim(e){return{x:e.x,z:e.z-yu}}}const pl=1,Cu=1,Pu=10;function Iu(r){const e=new URLSearchParams(r),t=e.get("autoplay")==="true",n=Lu(e.get("timescale")??e.get("speed"));return{enabled:t,timeScale:n}}function Lu(r){if(!r)return pl;const e=Number(r);return Number.isFinite(e)?Math.max(Cu,Math.min(Pu,e)):pl}class Du{constructor(e){w(this,"previousHealth",0);w(this,"previousZ",0);w(this,"currentStallSeconds",0);w(this,"maxStallSeconds",0);w(this,"damageTaken",0);w(this,"defeatedEnemies",0);w(this,"completionTimeSeconds");this.catalog=e}reset(e){this.previousHealth=e.player.health,this.previousZ=e.player.position.z,this.currentStallSeconds=0,this.maxStallSeconds=0,this.damageTaken=0,this.defeatedEnemies=0,this.completionTimeSeconds=void 0}observe(e,t){const n=e.player;this.damageTaken+=Math.max(0,this.previousHealth-n.health),this.previousHealth=n.health,this.defeatedEnemies+=e.events.filter(i=>i.type==="enemy-destroyed").length,this.isStalled(e)?(this.currentStallSeconds+=t,this.maxStallSeconds=Math.max(this.maxStallSeconds,this.currentStallSeconds)):this.currentStallSeconds=0,this.previousZ=n.position.z,this.isCampaignComplete(e)&&(this.completionTimeSeconds??(this.completionTimeSeconds=e.elapsedSeconds))}snapshot(e){return{completed:this.isCampaignComplete(e),completionTimeSeconds:this.completionTimeSeconds,damageTaken:this.damageTaken,defeatedEnemies:this.defeatedEnemies,elapsedSeconds:e.elapsedSeconds,maxStallSeconds:this.maxStallSeconds,unresolvedEntities:e.enemies.length+e.projectiles.length}}isStalled(e){return e.mission.status==="in-progress"&&Math.abs(this.previousZ-e.player.position.z)<.001}isCampaignComplete(e){return e.mission.status==="level-complete"&&this.catalog.levels[e.campaign.currentLevel].next===void 0}}const Nu=["bullet-impact","player-damaged","rocket-explosion","rocket-launch"],Fu=["rifle-shot","shotgun-blast"],Ur=[.85,1,1.15],Uu={"bullet-impact":.3,"player-damaged":.36,"rifle-shot":.34,"rocket-explosion":.4,"rocket-launch":.32,"shotgun-blast":.42},_s={thresholdDb:-8,kneeDb:3,ratio:12,attackSeconds:.003,releaseSeconds:.18};function mo(){return{sounds:{},gunfire:{}}}function Ou(r,e){return e===1?r:`${r}-pitch-${e.toFixed(2)}x`}function Bu(r,e,t){if(e)return zu(e)?ku(r.gunfire[e],t()):r.sounds[e]}function ku(r,e){if(!r)return;let t=Math.floor(e*Ur.length);Number.isFinite(t)||(t=1),t=Math.max(0,Math.min(Ur.length-1,t));const n=Ur[t]??1;return r[n]??r[1]??r[.85]??r[1.15]}function zu(r){return r==="rifle-shot"||r==="shotgun-blast"}function Gu(r){const e=r.createDynamicsCompressor();return e.threshold.value=_s.thresholdDb,e.knee.value=_s.kneeDb,e.ratio.value=_s.ratio,e.attack.value=_s.attackSeconds,e.release.value=_s.releaseSeconds,e.connect(r.destination),e}function Hu(r,e,t,n){return e.some(i=>{if(i.id<=t||i.type!=="explosion")return!1;const s=r.position.x-i.position.x,a=r.position.z-i.position.z,o=i.radius+n;return s*s+a*a<o*o})}const ml={rifle:420,shotgun:500,rocket:580},Vu={failure:{durationSeconds:.5,endFrequency:35,frequency:90,type:"sawtooth",volume:.04},victory:{durationSeconds:.5,endFrequency:760,frequency:520,type:"sine",volume:.04}},Wu=8;class gc{constructor(e,t,n=gc.createContext,i=Math.random){w(this,"audioContext");w(this,"audioOutput");w(this,"loadedBuffers",mo());w(this,"loadingBuffers");w(this,"voices",new Map);w(this,"lastEventId",0);w(this,"disposed",!1);w(this,"onContextStateChange",()=>{this.audioContext?.state!=="running"&&this.stopVoices()});this.bufferLoader=e,this.getBossRadius=t,this.createContext=n,this.randomAudio=i}activate(){if(this.disposed)return;const e=this.getOrCreateContext();e&&(this.resumeContext(e),this.loadBuffers(e))}pause(){this.stopVoices();const e=this.audioContext;if(!(!e||e.state==="closed"))try{e.suspend().catch(()=>{})}catch{return}}reset(){this.lastEventId=0,this.stopVoices()}playWeaponSelection(e){this.playTone({durationSeconds:.05,endFrequency:ml[e]*1.15,frequency:ml[e],type:"sine",volume:.018})}playResult(e){const t=e?"victory":"failure";this.playTone(Vu[t])}playEvents(e){const t=this.lastEventId;for(const n of e)n.id<=this.lastEventId||(this.lastEventId=n.id,this.playEvent(n,e,t))}dispose(){if(this.disposed)return;this.disposed=!0,this.stopVoices();const e=this.audioContext;if(this.audioContext=void 0,this.audioOutput=void 0,this.loadedBuffers=mo(),!!e&&(e.removeEventListener("statechange",this.onContextStateChange),e.state!=="closed"))try{e.close().catch(()=>{})}catch{return}}playEvent(e,t,n){const i=this.audioContext;if(!i||i.state!=="running")return;const s=this.getSound(e),a=Bu(this.loadedBuffers,s,this.randomAudio);if(s&&a&&this.playBuffer(a,Uu[s])||e.type==="boss-destroyed"&&Hu(e,t,n,this.getBossRadius()))return;const o=this.getTone(e);o&&this.playTone(o)}getSound(e){switch(e.type){case"enemy-hit":case"obstacle-hit":return"bullet-impact";case"explosion":return"rocket-explosion";case"player-damaged":return"player-damaged";case"weapon-fired":return e.weapon==="shotgun"?"shotgun-blast":e.weapon==="rocket"?"rocket-launch":"rifle-shot";default:return}}getTone(e){switch(e.type){case"boss-arrived":return{durationSeconds:.35,endFrequency:48,frequency:88,type:"sawtooth",volume:.045};case"boss-destroyed":return{durationSeconds:.5,endFrequency:35,frequency:92,type:"triangle",volume:.06};case"level-transitioned":return{durationSeconds:.35,endFrequency:500,frequency:680,type:"sine",volume:.035};case"enemy-hit":case"obstacle-hit":return{durationSeconds:.045,endFrequency:320,frequency:620,type:"triangle",volume:.025};case"enemy-destroyed":return{durationSeconds:.2,endFrequency:42,frequency:125,type:"sawtooth",volume:.055};case"explosion":return{durationSeconds:.16,endFrequency:48,frequency:145,type:"sawtooth",volume:.045};case"pickup-collected":return{durationSeconds:.12,endFrequency:1040,frequency:690,type:"sine",volume:.035};case"radio-collected":return{durationSeconds:.2,endFrequency:1260,frequency:840,type:"triangle",volume:.04};case"player-damaged":return{durationSeconds:.15,endFrequency:62,frequency:115,type:"square",volume:.045};case"weapon-fired":return e.weapon==="shotgun"?{durationSeconds:.11,endFrequency:95,frequency:220,type:"sawtooth",volume:.035}:e.weapon==="rocket"?{durationSeconds:.16,endFrequency:75,frequency:140,type:"triangle",volume:.045}:{durationSeconds:.055,endFrequency:410,frequency:520,type:"square",volume:.02};default:return}}playBuffer(e,t){const n=this.audioContext;if(!n||n.state!=="running")return!1;let i;try{i=n.createBufferSource();const s=n.createGain();return i.buffer=e,s.gain.setValueAtTime(t,n.currentTime),this.startVoice(i,s,n.currentTime)}catch{return i&&this.stopVoice(i),!1}}playTone(e){const t=this.audioContext;if(!t||t.state!=="running")return;let n;try{const i=t.currentTime;n=t.createOscillator();const s=t.createGain(),a=s.gain;if(n.type=e.type,n.frequency.setValueAtTime(e.frequency,i),n.frequency.linearRampToValueAtTime(e.endFrequency,i+e.durationSeconds),a.setValueAtTime(1e-4,i),a.linearRampToValueAtTime(e.volume,i+.008),a.exponentialRampToValueAtTime(1e-4,i+e.durationSeconds),!this.startVoice(n,s,i))return;n.stop(i+e.durationSeconds)}catch{n&&this.stopVoice(n);return}}startVoice(e,t,n){const i=this.audioContext;if(!i||i.state!=="running")return!1;this.makeVoiceRoom(),this.voices.set(e,t);try{return e.onended=()=>this.releaseVoice(e),e.connect(t),t.connect(this.audioOutput??i.destination),e.start(n),!0}catch{this.releaseVoice(e);try{e.stop()}catch{return!1}return!1}}makeVoiceRoom(){for(;this.voices.size>=Wu;){const e=this.voices.keys().next().value;if(!e)return;this.stopVoice(e)}}stopVoices(){for(const e of this.voices.keys())this.stopVoice(e)}stopVoice(e){this.releaseVoice(e);try{e.stop()}catch{return}}releaseVoice(e){const t=this.voices.get(e);t&&(this.voices.delete(e),e.onended=null,e.disconnect(),t.disconnect())}getOrCreateContext(){if(this.audioContext)return this.audioContext;try{this.audioContext=this.createContext()}catch{return}return this.audioContext&&(this.audioOutput=Gu(this.audioContext),this.audioContext.addEventListener("statechange",this.onContextStateChange)),this.audioContext}resumeContext(e){if(!(e.state==="running"||e.state==="closed"))try{e.resume().catch(()=>{})}catch{return}}loadBuffers(e){if(this.loadingBuffers)return;const t=this.bufferLoader.load(e).then(n=>{this.audioContext===e&&!this.disposed&&(this.loadedBuffers=n)}).catch(()=>{});this.loadingBuffers=t}static createContext(){if(typeof window>"u")return;const e=window.AudioContext;if(e)return new e}}const Xu=[["ogg",'audio/ogg; codecs="vorbis"'],["m4a",'audio/mp4; codecs="mp4a.40.2"']];class qu{constructor(e="./",t=globalThis.fetch.bind(globalThis),n=Ku){this.baseUrl=e,this.fetchAudio=t,this.getFormatOrder=n}async load(e){const t=mo(),n=Nu.map(async s=>{const a=await this.loadAudioAsset(e,s);a&&(t.sounds[s]=a)}),i=Fu.map(async s=>{const a={};await Promise.all(Ur.map(async o=>{const c=Ou(s,o),l=await this.loadAudioAsset(e,c);l&&(a[o]=l)})),Object.keys(a).length>0&&(t.gunfire[s]=a)});return await Promise.all([...n,...i]),t}async loadAudioAsset(e,t){for(const n of this.getFormatOrder()){const i=await this.loadFormat(e,t,n);if(i)return i}}async loadFormat(e,t,n){const i=`${this.baseUrl}assets/audio/combat/${t}.${n}`;try{const s=await this.fetchAudio(i);if(!s.ok)return;const a=await s.arrayBuffer();return await e.decodeAudioData(a)}catch{return}}}function Ku(){if(typeof document>"u")return["ogg","m4a"];const r=document.createElement("audio"),e=Xu.map(([n,i],s)=>({format:n,index:s,score:$u(r.canPlayType(i))}));return e.some(n=>n.score>0)?e.sort((n,i)=>i.score-n.score||n.index-i.index).map(n=>n.format):["ogg","m4a"]}function $u(r){return r==="probably"?2:r==="maybe"?1:0}class Yu{constructor(e,t,n,i,s){w(this,"audio");this.hasStarted=e,this.isActive=t,this.pauseMission=n,this.catalog=i,this.getCurrentLevel=s,this.audio=new gc(new qu,()=>this.getBossRadius()),this.onAudioGesture=this.onAudioGesture.bind(this),this.onVisibilityChange=this.onVisibilityChange.bind(this)}attach(){window.addEventListener("pointerdown",this.onAudioGesture,!0),window.addEventListener("keydown",this.onAudioGesture,!0),document.addEventListener("visibilitychange",this.onVisibilityChange)}beginMission(e){this.audio.reset(),e&&this.audio.activate()}setPaused(e){if(e){this.audio.pause();return}this.audio.activate()}playEvents(e){this.audio.playEvents(e)}playWeaponSelection(e){this.audio.playWeaponSelection(e)}finishMission(e){this.audio.reset(),this.audio.playResult(e)}dispose(){window.removeEventListener("pointerdown",this.onAudioGesture,!0),window.removeEventListener("keydown",this.onAudioGesture,!0),document.removeEventListener("visibilitychange",this.onVisibilityChange),this.audio.dispose()}getBossRadius(){const e=this.catalog.levels[this.getCurrentLevel()].boss;return e?this.catalog.enemies[e].radius:0}onAudioGesture(){this.hasStarted()&&this.audio.activate()}onVisibilityChange(){if(document.visibilityState==="hidden"){this.isActive()&&this.pauseMission(),this.audio.pause();return}this.isActive()&&this.audio.activate()}}function Zu(r){return new URLSearchParams(r).get("difficulty")==="hard"?"hard":"normal"}const ju=["jungle-front","desert-refinery","frozen-fortress"];function Ju(r,e){const t={};for(const n of ju)t[n]=(r.levels[n]??[]).filter(i=>i.kind==="crate"||i.kind==="fieldRadio").map(i=>Qu(i,e));return t}function Qu(r,e){const t={id:r.id,kind:r.kind==="crate"?"crate":"radio",radius:r.kind==="crate"?e.obstacles.crate.radius:e.combat.pickupDistance,x:r.x,z:r.z,scope:r.scope};return r.segment!==void 0&&(t.segment=r.segment),r.segmentEnd!==void 0&&(t.segmentEnd=r.segmentEnd),t}function ef(r,e,t,n){const i={authoredInteractables:Ju(e,r),difficulty:n};return t&&(i.playerObstacleCollision="disabled"),i}const Qe={accessibility:{game:"Frontline Assault 3D",hud:"Mission status",touchControls:"Touch controls",moveStick:"Move with left stick",aimStick:"Aim and fire with right stick",weapons:"Weapons",startScreen:"Start game",pauseScreen:"Game paused",resultScreen:"Mission result",levelTransition:"Level transition",autoplayMode:"Autoplay mode",pauseButton:"Pause game",cameraButton:"Change camera mode"},page:{titleFirstLine:"FRONTLINE",titleSecondLine:"ASSAULT 3D",startHeading:"FRONTLINE ASSAULT 3D",startDescription:"Advance down the route and clear the patrols.",startButton:"START MISSION",pauseHeading:"PAUSED",resumeButton:"RESUME",restartButton:"RESTART",playAgainButton:"PLAY AGAIN",rotateNotice:"Rotate your device to landscape.",moveCaption:"MOVE",aimCaption:"AIM + FIRE",weaponButtons:["1 RIFLE","2 SHOTGUN","3 ROCKET"]},autoplay:{indicator:"AUTOPLAY"},hud:{initialMission:"MISSION: ACTIVE",initialHealth:"HP: 100",initialScore:"SCORE: 0",initialWeapon:"WEAPON: RIFLE",initialEvent:"Advance through Jungle Front.",resetEvent:"Enemy patrol ahead.",messageDurationSeconds:2,levelIntroDurationSeconds:2.1,bossAlertDurationSeconds:2.2,weaponSelectionDurationSeconds:.55,operationPrefix:"OPERATION ",healthPrefix:"HP: ",scorePrefix:"SCORE: ",killsSeparator:" · KILLS: ",weaponPrefix:"WEAPON: ",weaponControlsSuffix:" · 1/2/3 Q/E",inProgressSeparator:": ",progressSuffix:"%",waveSeparator:" · WAVE ",patrolClearancePrefix:"PATROL CLEARANCE · ",bossPrefix:{"jungle-front":"COMMAND TANK · ","desert-refinery":"SIEGE CRAWLER · ","frozen-fortress":"FROZEN FORTRESS · "},transitioning:{"jungle-front":"COMMAND TANK DESTROYED · TRANSITIONING","desert-refinery":"SIEGE CRAWLER DESTROYED · TRANSITIONING","frozen-fortress":"FROZEN FORTRESS · TRANSITIONING"},campaignComplete:"CAMPAIGN COMPLETE"},levels:{"jungle-front":"JUNGLE FRONT","desert-refinery":"DESERT REFINERY","frozen-fortress":"FROZEN FORTRESS"},levelIntros:{"jungle-front":"LEVEL 1 — JUNGLE FRONT","desert-refinery":"LEVEL 2 — DESERT REFINERY","frozen-fortress":"LEVEL 3 — FROZEN FORTRESS"},levelIntroMessages:{"jungle-front":"Advance through the jungle route and clear every patrol.","desert-refinery":"Cross the refinery and destroy the Siege Crawler.","frozen-fortress":"Break through the ice and eliminate the Fortress Mech."},bossAlerts:{"jungle-front":"COMMAND TANK INBOUND.","desert-refinery":"SIEGE CRAWLER APPROACHING.","frozen-fortress":"FROZEN FORTRESS INBOUND."},bossDestroyed:{"jungle-front":"COMMAND TANK DESTROYED.","desert-refinery":"SIEGE CRAWLER DESTROYED.","frozen-fortress":"FROZEN FORTRESS CLEARED."},events:{"encounter-spawned":"New hostile contact spotted.","enemy-hit":"Direct hit.","enemy-destroyed":"Hostile eliminated.","obstacle-hit":"Obstacle hit.","obstacle-destroyed":"Obstacle destroyed.",explosion:"Rocket impact!","mission-failed":"Mission failed.","patrol-cleared":"Patrol route cleared. Command Tank ahead.","pickup-collected":"Pickup collected.","radio-collected":"Field radio secured.","player-damaged":"Under fire!","weapon-fired":"{weapon} fired."},results:{failed:{title:"MISSION FAILED",message:"You were overrun before extraction."},levelOutros:{"jungle-front":{title:"LEVEL 1 COMPLETE",message:"Command Tank destroyed. Desert Refinery is next."},"desert-refinery":{title:"LEVEL 2 COMPLETE",message:"Siege Crawler destroyed. Frozen Fortress is next."},"frozen-fortress":{title:"CAMPAIGN COMPLETE",message:"Fortress Mech destroyed. The campaign is secured."}},victory:{title:"MISSION COMPLETE",message:"Fortress Mech destroyed. The campaign is secured."},scorePrefix:"SCORE ",killsSeparator:" · KILLS ",accuracySeparator:" · ACCURACY ",accuracySuffix:"%"},controls:{pauseSymbol:"II",resumeSymbol:"▶",cameraModes:{wide:"CAM WIDE",medium:"CAM MEDIUM",close:"CAM CLOSE"}}},tf=1e3;class _c{constructor(e){w(this,"elements");w(this,"transitionKind");w(this,"transitionExpiresAt",0);this.input=e,this.elements=_c.createElements()}get isBlockingGameplay(){return this.transitionKind==="intro"}presentEvents(e,t,n){e.events.some(a=>a.type==="boss-destroyed")&&!n&&this.showLevelOutro(e.campaign.currentLevel);const s=e.events.find(a=>a.type==="level-transitioned");s?.type==="level-transitioned"&&this.showLevelIntro(s.level,t)}update(e){this.transitionKind!=="intro"||e<this.transitionExpiresAt||this.reset()}reset(){this.transitionKind=void 0,this.transitionExpiresAt=0,this.elements.screen.hidden=!0}dispose(){this.elements.screen.remove()}showLevelOutro(e){const t=Qe.results.levelOutros[e];this.elements.title.textContent=t.title,this.elements.message.textContent=t.message,this.transitionKind="outro",this.transitionExpiresAt=0,this.elements.screen.hidden=!1,this.input.clearHeldInput()}showLevelIntro(e,t){this.elements.title.textContent=Qe.levelIntros[e],this.elements.message.textContent=Qe.levelIntroMessages[e],this.transitionKind="intro",this.transitionExpiresAt=t+Qe.hud.levelIntroDurationSeconds*tf,this.elements.screen.hidden=!1,this.input.clearHeldInput()}static createElements(){const e=document.createElement("section");e.className="game-screen transition-screen",e.setAttribute("aria-label",Qe.accessibility.levelTransition),e.hidden=!0;const t=document.createElement("div");t.className="screen-card";const n=document.createElement("h2"),i=document.createElement("p");return t.append(n,i),e.append(t),document.getElementById("game")?.append(e),{message:i,screen:e,title:n}}}/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const xc="186",nf=0,gl=1,sf=2,Or=1,ad=2,Ls=3,_i=0,$t=1,Dn=2,Qn=0,Fs=1,_l=2,xl=3,vl=4,rf=5,es=100,af=101,of=102,cf=103,lf=104,hf=200,df=201,uf=202,ff=203,od=204,cd=205,pf=206,mf=207,gf=208,_f=209,xf=210,vf=211,Sf=212,yf=213,Mf=214,go=0,_o=1,xo=2,zs=3,vo=4,So=5,yo=6,Mo=7,ld=0,Ef=1,bf=2,Un=0,hd=1,dd=2,ud=3,fd=4,pd=5,md=6,gd=7,Sl="attached",Tf="detached",_d=300,Pi=301,os=302,xa=303,va=304,aa=306,cs=1e3,Nn=1001,Kr=1002,At=1003,xd=1004,Ds=1005,Rt=1006,Br=1007,Zn=1008,Qt=1009,vd=1010,Sd=1011,Gs=1012,vc=1013,On=1014,on=1015,Bn=1016,Sc=1017,yc=1018,Hs=1020,yd=35902,Md=35899,Ed=1021,bd=1022,cn=1023,ti=1026,Ai=1027,Mc=1028,Ec=1029,Ii=1030,bc=1031,Tc=1033,kr=33776,zr=33777,Gr=33778,Hr=33779,Eo=35840,bo=35841,To=35842,wo=35843,Ao=36196,Ro=37492,Co=37496,Po=37488,Io=37489,$r=37490,Lo=37491,Do=37808,No=37809,Fo=37810,Uo=37811,Oo=37812,Bo=37813,ko=37814,zo=37815,Go=37816,Ho=37817,Vo=37818,Wo=37819,Xo=37820,qo=37821,Ko=36492,$o=36494,Yo=36495,Zo=36283,jo=36284,Yr=36285,Jo=36286,Td=2200,wd=2201,wf=2202,Vs=2300,Ws=2301,Sa=2302,yl=2303,ts=2400,ns=2401,Zr=2402,wc=2500,Af=2501,Rf=0,Ad=1,Qo=2,Cf=3200,ec=0,Pf=1,pi="",Ut="srgb",tn="srgb-linear",jr="linear",rt="srgb",ya=7680,If=519,Lf=512,Df=513,Nf=514,Ac=515,Ff=516,Uf=517,Rc=518,Of=519,Rd=35044,Ml="300 es",Fn=2e3,Xs=2001;function Bf(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function kf(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function qs(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function zf(){const r=qs("canvas");return r.style.display="block",r}const El={};function Jr(...r){const e="THREE."+r.shift();console.log(e,...r)}function Cd(r){const e=r[0];if(typeof e=="string"&&e.startsWith("TSL:")){const t=r[1];t&&t.isStackTrace?r[0]+=" "+t.getLocation():r[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return r}function we(...r){r=Cd(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...r)}}function Fe(...r){r=Cd(r);const e="THREE."+r.shift();{const t=r[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...r)}}function ss(...r){const e=r.join(" ");e in El||(El[e]=!0,we(...r))}function Gf(r,e,t){return new Promise(function(n,i){function s(){switch(r.clientWaitSync(e,r.SYNC_FLUSH_COMMANDS_BIT,0)){case r.WAIT_FAILED:i();break;case r.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:n()}}setTimeout(s,t)})}const Hf={[go]:_o,[xo]:yo,[vo]:Mo,[zs]:So,[_o]:go,[yo]:xo,[Mo]:vo,[So]:zs};class vi{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const s=i.indexOf(t);s!==-1&&i.splice(s,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let s=0,a=i.length;s<a;s++)i[s].call(this,e);e.target=null}}}const Gt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let bl=1234567;const Us=Math.PI/180,ls=180/Math.PI;function Sn(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Gt[r&255]+Gt[r>>8&255]+Gt[r>>16&255]+Gt[r>>24&255]+"-"+Gt[e&255]+Gt[e>>8&255]+"-"+Gt[e>>16&15|64]+Gt[e>>24&255]+"-"+Gt[t&63|128]+Gt[t>>8&255]+"-"+Gt[t>>16&255]+Gt[t>>24&255]+Gt[n&255]+Gt[n>>8&255]+Gt[n>>16&255]+Gt[n>>24&255]).toLowerCase()}function Ke(r,e,t){return Math.max(e,Math.min(t,r))}function Cc(r,e){return(r%e+e)%e}function Vf(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)}function Wf(r,e,t){return r!==e?(t-r)/(e-r):0}function Os(r,e,t){return(1-t)*r+t*e}function Xf(r,e,t,n){return Os(r,e,1-Math.exp(-t*n))}function qf(r,e=1){return e-Math.abs(Cc(r,e*2)-e)}function Kf(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*(3-2*r))}function $f(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e),r*r*r*(r*(r*6-15)+10))}function Yf(r,e){return r+Math.floor(Math.random()*(e-r+1))}function Zf(r,e){return r+Math.random()*(e-r)}function jf(r){return r*(.5-Math.random())}function Jf(r){r!==void 0&&(bl=r);let e=bl+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Qf(r){return r*Us}function ep(r){return r*ls}function tp(r){return r>0&&Number.isInteger(r)&&2**Math.round(Math.log2(r))===r}function np(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))}function ip(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))}function sp(r,e,t,n,i){const s=Math.cos,a=Math.sin,o=s(t/2),c=a(t/2),l=s((e+n)/2),h=a((e+n)/2),d=s((e-n)/2),u=a((e-n)/2),f=s((n-e)/2),g=a((n-e)/2);switch(i){case"XYX":r.set(o*h,c*d,c*u,o*l);break;case"YZY":r.set(c*u,o*h,c*d,o*l);break;case"ZXZ":r.set(c*d,c*u,o*h,o*l);break;case"XZX":r.set(o*h,c*g,c*f,o*l);break;case"YXY":r.set(c*f,o*h,c*g,o*l);break;case"ZYZ":r.set(c*g,c*f,o*h,o*l);break;default:we("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function _n(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:case Uint8ClampedArray:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function at(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(r*4294967295);case Uint16Array:return Math.round(r*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(r*255);case Int32Array:return Math.round(r*2147483647);case Int16Array:return Math.round(r*32767);case Int8Array:return Math.round(r*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}const gn={DEG2RAD:Us,RAD2DEG:ls,generateUUID:Sn,clamp:Ke,euclideanModulo:Cc,mapLinear:Vf,inverseLerp:Wf,lerp:Os,damp:Xf,pingpong:qf,smoothstep:Kf,smootherstep:$f,randInt:Yf,randFloat:Zf,randFloatSpread:jf,seededRandom:Jf,degToRad:Qf,radToDeg:ep,isPowerOfTwo:tp,ceilPowerOfTwo:np,floorPowerOfTwo:ip,setQuaternionFromProperEuler:sp,normalize:at,denormalize:_n},jc=class jc{constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};jc.prototype.isVector2=!0;let Ne=jc;class hn{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3],u=s[a+0],f=s[a+1],g=s[a+2],y=s[a+3];if(d!==y||c!==u||l!==f||h!==g){let m=c*u+l*f+h*g+d*y;m<0&&(u=-u,f=-f,g=-g,y=-y,m=-m);let p=1-o;if(m<.9995){const M=Math.acos(m),C=Math.sin(M);p=Math.sin(p*M)/C,o=Math.sin(o*M)/C,c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+y*o}else{c=c*p+u*o,l=l*p+f*o,h=h*p+g*o,d=d*p+y*o;const M=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=M,l*=M,h*=M,d*=M}}e[t]=c,e[t+1]=l,e[t+2]=h,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,s,a){const o=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=s[a],u=s[a+1],f=s[a+2],g=s[a+3];return e[t]=o*g+h*d+c*f-l*u,e[t+1]=c*g+h*u+l*d-o*f,e[t+2]=l*g+h*f+o*u-c*d,e[t+3]=h*g-o*d-c*u-l*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,c=Math.sin,l=o(n/2),h=o(i/2),d=o(s/2),u=c(n/2),f=c(i/2),g=c(s/2);switch(a){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:we("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],c=t[9],l=t[2],h=t[6],d=t[10],u=n+o+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(s-l)*f,this._z=(a-i)*f}else if(n>o&&n>d){const f=2*Math.sqrt(1+n-o-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+a)/f,this._z=(s+l)/f}else if(o>d){const f=2*Math.sqrt(1+o-n-d);this._w=(s-l)/f,this._x=(i+a)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-o);this._w=(a-i)/f,this._x=(s+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,c=t._y,l=t._z,h=t._w;return this._x=n*h+a*o+i*l-s*c,this._y=i*h+a*c+s*o-n*l,this._z=s*h+a*l+n*c-i*o,this._w=a*h-n*o-i*c-s*l,this._onChangeCallback(),this}slerp(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=this.dot(e);o<0&&(n=-n,i=-i,s=-s,a=-a,o=-o);let c=1-t;if(o<.9995){const l=Math.acos(o),h=Math.sin(l);c=Math.sin(c*l)/h,t=Math.sin(t*l)/h,this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this._onChangeCallback()}else this._x=this._x*c+n*t,this._y=this._y*c+i*t,this._z=this._z*c+s*t,this._w=this._w*c+a*t,this.normalize();return this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}const Jc=class Jc{constructor(e=0,t=0,n=0){this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Tl.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Tl.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,c=e.w,l=2*(a*i-o*n),h=2*(o*t-s*i),d=2*(s*n-a*t);return this.x=t+c*l+a*d-o*h,this.y=n+c*h+o*l-s*d,this.z=i+c*d+s*h-a*l,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,c=t.z;return this.x=i*c-s*o,this.y=s*a-n*c,this.z=n*o-i*a,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Ma.copy(this).projectOnVector(e),this.sub(Ma)}reflect(e){return this.sub(Ma.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}};Jc.prototype.isVector3=!0;let I=Jc;const Ma=new I,Tl=new hn,Qc=class Qc{constructor(e,t,n,i,s,a,o,c,l){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l)}set(e,t,n,i,s,a,o,c,l){const h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=c,h[6]=n,h[7]=a,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],y=i[0],m=i[3],p=i[6],M=i[1],C=i[4],v=i[7],E=i[2],b=i[5],A=i[8];return s[0]=a*y+o*M+c*E,s[3]=a*m+o*C+c*b,s[6]=a*p+o*v+c*A,s[1]=l*y+h*M+d*E,s[4]=l*m+h*C+d*b,s[7]=l*p+h*v+d*A,s[2]=u*y+f*M+g*E,s[5]=u*m+f*C+g*b,s[8]=u*p+f*v+g*A,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8];return t*a*h-t*o*l-n*s*h+n*o*c+i*s*l-i*a*c}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=h*a-o*l,u=o*c-h*s,f=l*s-a*c,g=t*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const y=1/g;return e[0]=d*y,e[1]=(i*l-h*n)*y,e[2]=(o*n-i*a)*y,e[3]=u*y,e[4]=(h*t-i*c)*y,e[5]=(i*s-o*t)*y,e[6]=f*y,e[7]=(n*c-l*t)*y,e[8]=(a*t-n*s)*y,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){const c=Math.cos(s),l=Math.sin(s);return this.set(n*c,n*l,-n*(c*a+l*o)+a+e,-i*l,i*c,-i*(-l*a+c*o)+o+t,0,0,1),this}scale(e,t){return ss("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ea.makeScale(e,t)),this}rotate(e){return ss("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ea.makeRotation(-e)),this}translate(e,t){return ss("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ea.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}};Qc.prototype.isMatrix3=!0;let Oe=Qc;const Ea=new Oe,wl=new Oe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Al=new Oe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function rp(){const r={enabled:!0,workingColorSpace:tn,spaces:{},convert:function(i,s,a){return this.enabled===!1||s===a||!s||!a||(this.spaces[s].transfer===rt&&(i.r=ei(i.r),i.g=ei(i.g),i.b=ei(i.b)),this.spaces[s].primaries!==this.spaces[a].primaries&&(i.applyMatrix3(this.spaces[s].toXYZ),i.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===rt&&(i.r=rs(i.r),i.g=rs(i.g),i.b=rs(i.b))),i},workingToColorSpace:function(i,s){return this.convert(i,this.workingColorSpace,s)},colorSpaceToWorking:function(i,s){return this.convert(i,s,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===pi?jr:this.spaces[i].transfer},getToneMappingMode:function(i){return this.spaces[i].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(i,s=this.workingColorSpace){return i.fromArray(this.spaces[s].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,s,a){return i.copy(this.spaces[s].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,s){return ss("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),r.workingToColorSpace(i,s)},toWorkingColorSpace:function(i,s){return ss("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),r.colorSpaceToWorking(i,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return r.define({[tn]:{primaries:e,whitePoint:n,transfer:jr,toXYZ:wl,fromXYZ:Al,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ut},outputColorSpaceConfig:{drawingBufferColorSpace:Ut}},[Ut]:{primaries:e,whitePoint:n,transfer:rt,toXYZ:wl,fromXYZ:Al,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ut}}}),r}const qe=rp();function ei(r){return r<.04045?r*.0773993808:Math.pow(r*.9478672986+.0521327014,2.4)}function rs(r){return r<.0031308?r*12.92:1.055*Math.pow(r,.41666)-.055}let Ni;class ap{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{Ni===void 0&&(Ni=qs("canvas")),Ni.width=e.width,Ni.height=e.height;const i=Ni.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=Ni}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=qs("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=ei(s[a]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(ei(t[n]/255)*255):t[n]=ei(t[n]);return{data:t,width:e.width,height:e.height}}else return we("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let op=0;class Pc{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:op++}),this.uuid=Sn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(ba(i[a].image)):s.push(ba(i[a]))}else s=ba(i);n.url=s}return t||(e.images[this.uuid]=n),n}}function ba(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?ap.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(we("Texture: Unable to serialize Texture."),{})}let cp=0;const Ta=new I;class St extends vi{constructor(e=St.DEFAULT_IMAGE,t=St.DEFAULT_MAPPING,n=Nn,i=Nn,s=Rt,a=Zn,o=cn,c=Qt,l=St.DEFAULT_ANISOTROPY,h=pi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:cp++}),this.uuid=Sn(),this.name="",this.source=new Pc(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Ne(0,0),this.repeat=new Ne(1,1),this.center=new Ne(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Oe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ta).x}get height(){return this.source.getSize(Ta).y}get depth(){return this.source.getSize(Ta).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){we(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){we(`Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==_d)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case cs:e.x=e.x-Math.floor(e.x);break;case Nn:e.x=e.x<0?0:1;break;case Kr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case cs:e.y=e.y-Math.floor(e.y);break;case Nn:e.y=e.y<0?0:1;break;case Kr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}St.DEFAULT_IMAGE=null;St.DEFAULT_MAPPING=_d;St.DEFAULT_ANISOTROPY=1;const el=class el{constructor(e=0,t=0,n=0,i=1){this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s;const c=e.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],y=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-y)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+y)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const C=(l+1)/2,v=(f+1)/2,E=(p+1)/2,b=(h+u)/4,A=(d+y)/4,x=(g+m)/4;return C>v&&C>E?C<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(C),i=b/n,s=A/n):v>E?v<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(v),n=b/i,s=x/i):E<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(E),n=A/s,i=x/s),this.set(n,i,s,t),this}let M=Math.sqrt((m-g)*(m-g)+(d-y)*(d-y)+(u-h)*(u-h));return Math.abs(M)<.001&&(M=1),this.x=(m-g)/M,this.y=(d-y)/M,this.z=(u-h)/M,this.w=Math.acos((l+f+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};el.prototype.isVector4=!0;let ct=el;class lp extends vi{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ct(0,0,e,t),this.scissorTest=!1,this.viewport=new ct(0,0,e,t),this.textures=[];const i={width:e,height:t,depth:n.depth},s=new St(i),a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveColorBuffer=n.resolveColorBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.storeMultisampledColorBuffer=n.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=n.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=n.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview,this.useArrayDepthTexture=n.useArrayDepthTexture}_setTextureOptions(e={}){const t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isData3DTexture!==!0&&(this.textures[i].isArrayTexture=this.textures[i].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new Pc(i)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){const t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}}class yn extends lp{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Pd extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class hp extends St{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=At,this.minFilter=At,this.wrapR=Nn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}}const ra=class ra{constructor(e,t,n,i,s,a,o,c,l,h,d,u,f,g,y,m){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,c,l,h,d,u,f,g,y,m)}set(e,t,n,i,s,a,o,c,l,h,d,u,f,g,y,m){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=s,p[5]=a,p[9]=o,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=y,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ra().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),n.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this)}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();const t=this.elements,n=e.elements,i=1/Fi.setFromMatrixColumn(e,0).length(),s=1/Fi.setFromMatrixColumn(e,1).length(),a=1/Fi.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(s),d=Math.sin(s);if(e.order==="XYZ"){const u=a*h,f=a*d,g=o*h,y=o*d;t[0]=c*h,t[4]=-c*d,t[8]=l,t[1]=f+g*l,t[5]=u-y*l,t[9]=-o*c,t[2]=y-u*l,t[6]=g+f*l,t[10]=a*c}else if(e.order==="YXZ"){const u=c*h,f=c*d,g=l*h,y=l*d;t[0]=u+y*o,t[4]=g*o-f,t[8]=a*l,t[1]=a*d,t[5]=a*h,t[9]=-o,t[2]=f*o-g,t[6]=y+u*o,t[10]=a*c}else if(e.order==="ZXY"){const u=c*h,f=c*d,g=l*h,y=l*d;t[0]=u-y*o,t[4]=-a*d,t[8]=g+f*o,t[1]=f+g*o,t[5]=a*h,t[9]=y-u*o,t[2]=-a*l,t[6]=o,t[10]=a*c}else if(e.order==="ZYX"){const u=a*h,f=a*d,g=o*h,y=o*d;t[0]=c*h,t[4]=g*l-f,t[8]=u*l+y,t[1]=c*d,t[5]=y*l+u,t[9]=f*l-g,t[2]=-l,t[6]=o*c,t[10]=a*c}else if(e.order==="YZX"){const u=a*c,f=a*l,g=o*c,y=o*l;t[0]=c*h,t[4]=y-u*d,t[8]=g*d+f,t[1]=d,t[5]=a*h,t[9]=-o*h,t[2]=-l*h,t[6]=f*d+g,t[10]=u-y*d}else if(e.order==="XZY"){const u=a*c,f=a*l,g=o*c,y=o*l;t[0]=c*h,t[4]=-d,t[8]=l*h,t[1]=u*d+y,t[5]=a*h,t[9]=f*d-g,t[2]=g*d-f,t[6]=o*h,t[10]=y*d+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(dp,e,up)}lookAt(e,t,n){const i=this.elements;return Zt.subVectors(e,t),Zt.lengthSq()===0&&(Zt.z=1),Zt.normalize(),oi.crossVectors(n,Zt),oi.lengthSq()===0&&(Math.abs(n.z)===1?Zt.x+=1e-4:Zt.z+=1e-4,Zt.normalize(),oi.crossVectors(n,Zt)),oi.normalize(),sr.crossVectors(Zt,oi),i[0]=oi.x,i[4]=sr.x,i[8]=Zt.x,i[1]=oi.y,i[5]=sr.y,i[9]=Zt.y,i[2]=oi.z,i[6]=sr.z,i[10]=Zt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],y=n[6],m=n[10],p=n[14],M=n[3],C=n[7],v=n[11],E=n[15],b=i[0],A=i[4],x=i[8],T=i[12],P=i[1],D=i[5],O=i[9],H=i[13],U=i[2],G=i[6],Z=i[10],X=i[14],ie=i[3],K=i[7],ee=i[11],ne=i[15];return s[0]=a*b+o*P+c*U+l*ie,s[4]=a*A+o*D+c*G+l*K,s[8]=a*x+o*O+c*Z+l*ee,s[12]=a*T+o*H+c*X+l*ne,s[1]=h*b+d*P+u*U+f*ie,s[5]=h*A+d*D+u*G+f*K,s[9]=h*x+d*O+u*Z+f*ee,s[13]=h*T+d*H+u*X+f*ne,s[2]=g*b+y*P+m*U+p*ie,s[6]=g*A+y*D+m*G+p*K,s[10]=g*x+y*O+m*Z+p*ee,s[14]=g*T+y*H+m*X+p*ne,s[3]=M*b+C*P+v*U+E*ie,s[7]=M*A+C*D+v*G+E*K,s[11]=M*x+C*O+v*Z+E*ee,s[15]=M*T+C*H+v*X+E*ne,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],c=e[9],l=e[13],h=e[2],d=e[6],u=e[10],f=e[14],g=e[3],y=e[7],m=e[11],p=e[15],M=c*f-l*u,C=o*f-l*d,v=o*u-c*d,E=a*f-l*h,b=a*u-c*h,A=a*d-o*h;return t*(y*M-m*C+p*v)-n*(g*M-m*E+p*b)+i*(g*C-y*E+p*A)-s*(g*v-y*b+m*A)}determinantAffine(){const e=this.elements,t=e[0],n=e[4],i=e[8],s=e[1],a=e[5],o=e[9],c=e[2],l=e[6],h=e[10];return t*(a*h-o*l)-n*(s*h-o*c)+i*(s*l-a*c)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],c=e[6],l=e[7],h=e[8],d=e[9],u=e[10],f=e[11],g=e[12],y=e[13],m=e[14],p=e[15],M=t*o-n*a,C=t*c-i*a,v=t*l-s*a,E=n*c-i*o,b=n*l-s*o,A=i*l-s*c,x=h*y-d*g,T=h*m-u*g,P=h*p-f*g,D=d*m-u*y,O=d*p-f*y,H=u*p-f*m,U=M*H-C*O+v*D+E*P-b*T+A*x;if(U===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const G=1/U;return e[0]=(o*H-c*O+l*D)*G,e[1]=(i*O-n*H-s*D)*G,e[2]=(y*A-m*b+p*E)*G,e[3]=(u*b-d*A-f*E)*G,e[4]=(c*P-a*H-l*T)*G,e[5]=(t*H-i*P+s*T)*G,e[6]=(m*v-g*A-p*C)*G,e[7]=(h*A-u*v+f*C)*G,e[8]=(a*O-o*P+l*x)*G,e[9]=(n*P-t*O-s*x)*G,e[10]=(g*b-y*v+p*M)*G,e[11]=(d*v-h*b-f*M)*G,e[12]=(o*T-a*D-c*x)*G,e[13]=(t*D-n*T+i*x)*G,e[14]=(y*C-g*E-m*M)*G,e[15]=(h*E-d*C+u*M)*G,this}scale(e){const t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,c=e.z,l=s*a,h=s*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,h*o+n,h*c-i*a,0,l*c-i*o,h*c+i*a,s*c*c+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,s=t._x,a=t._y,o=t._z,c=t._w,l=s+s,h=a+a,d=o+o,u=s*l,f=s*h,g=s*d,y=a*h,m=a*d,p=o*d,M=c*l,C=c*h,v=c*d,E=n.x,b=n.y,A=n.z;return i[0]=(1-(y+p))*E,i[1]=(f+v)*E,i[2]=(g-C)*E,i[3]=0,i[4]=(f-v)*b,i[5]=(1-(u+p))*b,i[6]=(m+M)*b,i[7]=0,i[8]=(g+C)*A,i[9]=(m-M)*A,i[10]=(1-(u+y))*A,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;e.x=i[12],e.y=i[13],e.z=i[14];const s=this.determinantAffine();if(s===0)return n.set(1,1,1),t.identity(),this;let a=Fi.set(i[0],i[1],i[2]).length();const o=Fi.set(i[4],i[5],i[6]).length(),c=Fi.set(i[8],i[9],i[10]).length();s<0&&(a=-a),un.copy(this);const l=1/a,h=1/o,d=1/c;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=d,un.elements[9]*=d,un.elements[10]*=d,t.setFromRotationMatrix(un),n.x=a,n.y=o,n.z=c,this}makePerspective(e,t,n,i,s,a,o=Fn,c=!1){const l=this.elements,h=2*s/(t-e),d=2*s/(n-i),u=(t+e)/(t-e),f=(n+i)/(n-i);let g,y;if(c)g=s/(a-s),y=a*s/(a-s);else if(o===Fn)g=-(a+s)/(a-s),y=-2*a*s/(a-s);else if(o===Xs)g=-a/(a-s),y=-a*s/(a-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=d,l[9]=f,l[13]=0,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=Fn,c=!1){const l=this.elements,h=2/(t-e),d=2/(n-i),u=-(t+e)/(t-e),f=-(n+i)/(n-i);let g,y;if(c)g=1/(a-s),y=a/(a-s);else if(o===Fn)g=-2/(a-s),y=-(a+s)/(a-s);else if(o===Xs)g=-1/(a-s),y=-s/(a-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return l[0]=h,l[4]=0,l[8]=0,l[12]=u,l[1]=0,l[5]=d,l[9]=0,l[13]=f,l[2]=0,l[6]=0,l[10]=g,l[14]=y,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}};ra.prototype.isMatrix4=!0;let ke=ra;const Fi=new I,un=new ke,dp=new I(0,0,0),up=new I(1,1,1),oi=new I,sr=new I,Zt=new I,Rl=new ke,Cl=new hn;class xi{constructor(e=0,t=0,n=0,i=xi.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,s=i[0],a=i[4],o=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(t){case"XYZ":this._y=Math.asin(Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,s),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,s));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,s)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(Ke(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,s)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:we("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Rl.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rl,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Cl.setFromEuler(this),this.setFromQuaternion(Cl,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}xi.DEFAULT_ORDER="XYZ";class Ic{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let fp=0;const Pl=new I,Ui=new hn,Vn=new ke,rr=new I,xs=new I,pp=new I,mp=new hn,Il=new I(1,0,0),Ll=new I(0,1,0),Dl=new I(0,0,1),Nl={type:"added"},gp={type:"removed"},Oi={type:"childadded",child:null},wa={type:"childremoved",child:null};class lt extends vi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:fp++}),this.uuid=Sn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=lt.DEFAULT_UP.clone();const e=new I,t=new xi,n=new hn,i=new I(1,1,1);function s(){n.setFromEuler(t,!1)}function a(){t.setFromQuaternion(n,void 0,!1)}t._onChange(s),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ke},normalMatrix:{value:new Oe}}),this.matrix=new ke,this.matrixWorld=new ke,this.matrixAutoUpdate=lt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Ic,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.multiply(Ui),this}rotateOnWorldAxis(e,t){return Ui.setFromAxisAngle(e,t),this.quaternion.premultiply(Ui),this}rotateX(e){return this.rotateOnAxis(Il,e)}rotateY(e){return this.rotateOnAxis(Ll,e)}rotateZ(e){return this.rotateOnAxis(Dl,e)}translateOnAxis(e,t){return Pl.copy(e).applyQuaternion(this.quaternion),this.position.add(Pl.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Il,e)}translateY(e){return this.translateOnAxis(Ll,e)}translateZ(e){return this.translateOnAxis(Dl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Vn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?rr.copy(e):rr.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),xs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Vn.lookAt(xs,rr,this.up):Vn.lookAt(rr,xs,this.up),this.quaternion.setFromRotationMatrix(Vn),i&&(Vn.extractRotation(i.matrixWorld),Ui.setFromRotationMatrix(Vn),this.quaternion.premultiply(Ui.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Fe("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Nl),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null):Fe("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(gp),wa.child=e,this.dispatchEvent(wa),wa.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Vn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Vn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Vn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Nl),Oi.child=e,this.dispatchEvent(Oi),Oi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,e,pp),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(xs,mp,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);const e=this.pivot;if(e!==null){const t=e.x,n=e.y,i=e.z,s=this.matrix.elements;s[12]+=t-s[0]*t-s[4]*n-s[8]*i,s[13]+=n-s[1]*t-s[5]*n-s[9]*i,s[14]+=i-s[2]*t-s[6]*n-s[10]*i}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t,n=!1){const i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||n)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,n=!0),t===!0){const s=this.children;for(let a=0,o=s.length;a<o;a++)s[a].updateWorldMatrix(!1,!0,n)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,i.name=this.name,i.castShadow=this.castShadow,i.receiveShadow=this.receiveShadow,i.visible=this.visible,i.frustumCulled=this.frustumCulled,i.renderOrder=this.renderOrder,i.static=this.static,i.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.pivot!==null&&(i.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(i.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(i.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(o=>({...o})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function s(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(e)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];s(e.shapes,d)}else s(e.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(s(e.materials,this.material[c]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(s(e.animations,c))}}if(t){const o=a(e.geometries),c=a(e.materials),l=a(e.textures),h=a(e.images),d=a(e.shapes),u=a(e.skeletons),f=a(e.animations),g=a(e.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const h=o[l];delete h.metadata,c.push(h)}return c}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}}lt.DEFAULT_UP=new I(0,1,0);lt.DEFAULT_MATRIX_AUTO_UPDATE=!0;lt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;class wt extends lt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const _p={type:"move"};class Aa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new wt,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new wt,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new I,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new I),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new wt,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new I,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new I,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(l&&e.hand){a=!0;for(const y of e.hand.values()){const m=t.getJointPose(y,n),p=this._getHandJoint(l,y);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else c!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(c.matrix.fromArray(s.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,s.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(s.linearVelocity)):c.hasLinearVelocity=!1,s.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(s.angularVelocity)):c.hasAngularVelocity=!1,c.eventsEnabled&&c.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(_p)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=s!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new wt;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}const Id={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},ci={h:0,s:0,l:0},ar={h:0,s:0,l:0};function Ra(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+(e-r)*6*t:t<1/2?e:t<2/3?r+(e-r)*6*(2/3-t):r}class Ce{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ut){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,qe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=qe.workingColorSpace){if(e=Cc(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=Ra(a,s,e+1/3),this.g=Ra(a,s,e),this.b=Ra(a,s,e-1/3)}return qe.colorSpaceToWorking(this,i),this}setStyle(e,t=Ut){function n(s){s!==void 0&&parseFloat(s)<1&&we("Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:we("Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);we("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ut){const n=Id[e.toLowerCase()];return n!==void 0?this.setHex(n,t):we("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ei(e.r),this.g=ei(e.g),this.b=ei(e.b),this}copyLinearToSRGB(e){return this.r=rs(e.r),this.g=rs(e.g),this.b=rs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ut){return qe.workingToColorSpace(Ht.copy(this),e),Math.round(Ke(Ht.r*255,0,255))*65536+Math.round(Ke(Ht.g*255,0,255))*256+Math.round(Ke(Ht.b*255,0,255))}getHexString(e=Ut){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=qe.workingColorSpace){qe.workingToColorSpace(Ht.copy(this),t);const n=Ht.r,i=Ht.g,s=Ht.b,a=Math.max(n,i,s),o=Math.min(n,i,s);let c,l;const h=(o+a)/2;if(o===a)c=0,l=0;else{const d=a-o;switch(l=h<=.5?d/(a+o):d/(2-a-o),a){case n:c=(i-s)/d+(i<s?6:0);break;case i:c=(s-n)/d+2;break;case s:c=(n-i)/d+4;break}c/=6}return e.h=c,e.s=l,e.l=h,e}getRGB(e,t=qe.workingColorSpace){return qe.workingToColorSpace(Ht.copy(this),t),e.r=Ht.r,e.g=Ht.g,e.b=Ht.b,e}getStyle(e=Ut){qe.workingToColorSpace(Ht.copy(this),e);const t=Ht.r,n=Ht.g,i=Ht.b;return e!==Ut?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(ci),this.setHSL(ci.h+e,ci.s+t,ci.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(ci),e.getHSL(ar);const n=Os(ci.h,ar.h,t),i=Os(ci.s,ar.s,t),s=Os(ci.l,ar.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ht=new Ce;Ce.NAMES=Id;class Lc{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ce(e),this.near=t,this.far=n}clone(){return new Lc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class xp extends lt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new xi,this.environmentIntensity=1,this.environmentRotation=new xi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}}const fn=new I,Wn=new I,Ca=new I,Xn=new I,Bi=new I,ki=new I,Fl=new I,Pa=new I,Ia=new I,La=new I,Da=new ct,Na=new ct,Fa=new ct;class an{constructor(e=new I,t=new I,n=new I){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),fn.subVectors(e,t),i.cross(fn);const s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){fn.subVectors(i,t),Wn.subVectors(n,t),Ca.subVectors(e,t);const a=fn.dot(fn),o=fn.dot(Wn),c=fn.dot(Ca),l=Wn.dot(Wn),h=Wn.dot(Ca),d=a*l-o*o;if(d===0)return s.set(0,0,0),null;const u=1/d,f=(l*c-o*h)*u,g=(a*h-o*c)*u;return s.set(1-f-g,g,f)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,Xn)===null?!1:Xn.x>=0&&Xn.y>=0&&Xn.x+Xn.y<=1}static getInterpolation(e,t,n,i,s,a,o,c){return this.getBarycoord(e,t,n,i,Xn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(s,Xn.x),c.addScaledVector(a,Xn.y),c.addScaledVector(o,Xn.z),c)}static getInterpolatedAttribute(e,t,n,i,s,a){return Da.setScalar(0),Na.setScalar(0),Fa.setScalar(0),Da.fromBufferAttribute(e,t),Na.fromBufferAttribute(e,n),Fa.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Da,s.x),a.addScaledVector(Na,s.y),a.addScaledVector(Fa,s.z),a}static isFrontFacing(e,t,n,i){return fn.subVectors(n,t),Wn.subVectors(e,t),fn.cross(Wn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return fn.subVectors(this.c,this.b),Wn.subVectors(this.a,this.b),fn.cross(Wn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return an.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return an.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return an.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return an.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return an.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,s=this.c;let a,o;Bi.subVectors(i,n),ki.subVectors(s,n),Pa.subVectors(e,n);const c=Bi.dot(Pa),l=ki.dot(Pa);if(c<=0&&l<=0)return t.copy(n);Ia.subVectors(e,i);const h=Bi.dot(Ia),d=ki.dot(Ia);if(h>=0&&d<=h)return t.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return a=c/(c-h),t.copy(n).addScaledVector(Bi,a);La.subVectors(e,s);const f=Bi.dot(La),g=ki.dot(La);if(g>=0&&f<=g)return t.copy(s);const y=f*l-c*g;if(y<=0&&l>=0&&g<=0)return o=l/(l-g),t.copy(n).addScaledVector(ki,o);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return Fl.subVectors(s,i),o=(d-h)/(d-h+(f-g)),t.copy(i).addScaledVector(Fl,o);const p=1/(m+y+u);return a=y*p,o=u*p,t.copy(n).addScaledVector(Bi,a).addScaledVector(ki,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}class en{constructor(e=new I(1/0,1/0,1/0),t=new I(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,pn):pn.fromBufferAttribute(s,a),pn.applyMatrix4(e.matrixWorld),this.expandByPoint(pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),or.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),or.copy(n.boundingBox)),or.applyMatrix4(e.matrixWorld),this.union(or)}const i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,pn),pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(vs),cr.subVectors(this.max,vs),zi.subVectors(e.a,vs),Gi.subVectors(e.b,vs),Hi.subVectors(e.c,vs),li.subVectors(Gi,zi),hi.subVectors(Hi,Gi),yi.subVectors(zi,Hi);let t=[0,-li.z,li.y,0,-hi.z,hi.y,0,-yi.z,yi.y,li.z,0,-li.x,hi.z,0,-hi.x,yi.z,0,-yi.x,-li.y,li.x,0,-hi.y,hi.x,0,-yi.y,yi.x,0];return!Ua(t,zi,Gi,Hi,cr)||(t=[1,0,0,0,1,0,0,0,1],!Ua(t,zi,Gi,Hi,cr))?!1:(lr.crossVectors(li,hi),t=[lr.x,lr.y,lr.z],Ua(t,zi,Gi,Hi,cr))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(qn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),qn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),qn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),qn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),qn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),qn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),qn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),qn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(qn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const qn=[new I,new I,new I,new I,new I,new I,new I,new I],pn=new I,or=new en,zi=new I,Gi=new I,Hi=new I,li=new I,hi=new I,yi=new I,vs=new I,cr=new I,lr=new I,Mi=new I;function Ua(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){Mi.fromArray(r,s);const o=i.x*Math.abs(Mi.x)+i.y*Math.abs(Mi.y)+i.z*Math.abs(Mi.z),c=e.dot(Mi),l=t.dot(Mi),h=n.dot(Mi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>o)return!1}return!0}const bt=new I,hr=new Ne;let vp=0;class Yt extends vi{constructor(e,t,n=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:vp++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Rd,this.updateRanges=[],this.gpuType=on,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)hr.fromBufferAttribute(this,t),hr.applyMatrix3(e),this.setXY(t,hr.x,hr.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix3(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyMatrix4(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.applyNormalMatrix(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)bt.fromBufferAttribute(this,t),bt.transformDirection(e),this.setXYZ(t,bt.x,bt.y,bt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=_n(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=_n(t,this.array)),t}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=_n(t,this.array)),t}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=_n(t,this.array)),t}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=_n(t,this.array)),t}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),s=at(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}}class Ld extends Yt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Dd extends Yt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class mt extends Yt{constructor(e,t,n){super(new Float32Array(e),t,n)}}const Sp=new en,Ss=new I,Oa=new I;class Gn{constructor(e=new I,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Sp.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ss.subVectors(e,this.center);const t=Ss.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(Ss,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Oa.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ss.copy(e.center).add(Oa)),this.expandByPoint(Ss.copy(e.center).sub(Oa))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}let yp=0;const sn=new ke,Ba=new lt,Vi=new I,jt=new en,ys=new en,Nt=new I;class Lt extends vi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:yp++}),this.uuid=Sn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Bf(e)?Dd:Ld)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const s=new Oe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return sn.makeRotationFromQuaternion(e),this.applyMatrix4(sn),this}rotateX(e){return sn.makeRotationX(e),this.applyMatrix4(sn),this}rotateY(e){return sn.makeRotationY(e),this.applyMatrix4(sn),this}rotateZ(e){return sn.makeRotationZ(e),this.applyMatrix4(sn),this}translate(e,t,n){return sn.makeTranslation(e,t,n),this.applyMatrix4(sn),this}scale(e,t,n){return sn.makeScale(e,t,n),this.applyMatrix4(sn),this}lookAt(e){return Ba.lookAt(e),Ba.updateMatrix(),this.applyMatrix4(Ba.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Vi).negate(),this.translate(Vi.x,Vi.y,Vi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,s=e.length;i<s;i++){const a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new mt(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const s=e[i];t.setXYZ(i,s.x,s.y,s.z||0)}e.length>t.count&&we("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new en);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new I(-1/0,-1/0,-1/0),new I(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const s=t[n];jt.setFromBufferAttribute(s),this.morphTargetsRelative?(Nt.addVectors(this.boundingBox.min,jt.min),this.boundingBox.expandByPoint(Nt),Nt.addVectors(this.boundingBox.max,jt.max),this.boundingBox.expandByPoint(Nt)):(this.boundingBox.expandByPoint(jt.min),this.boundingBox.expandByPoint(jt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Fe('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Gn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Fe("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new I,1/0);return}if(e){const n=this.boundingSphere.center;if(jt.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){const o=t[s];ys.setFromBufferAttribute(o),this.morphTargetsRelative?(Nt.addVectors(jt.min,ys.min),jt.expandByPoint(Nt),Nt.addVectors(jt.max,ys.max),jt.expandByPoint(Nt)):(jt.expandByPoint(ys.min),jt.expandByPoint(ys.max))}jt.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)Nt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(Nt));if(t)for(let s=0,a=t.length;s<a;s++){const o=t[s],c=this.morphTargetsRelative;for(let l=0,h=o.count;l<h;l++)Nt.fromBufferAttribute(o,l),c&&(Vi.fromBufferAttribute(e,l),Nt.add(Vi)),i=Math.max(i,n.distanceToSquared(Nt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&Fe('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Fe("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,s=t.uv;let a=this.getAttribute("tangent");(a===void 0||a.count!==n.count)&&(a=new Yt(new Float32Array(4*n.count),4),this.setAttribute("tangent",a));const o=[],c=[];for(let x=0;x<n.count;x++)o[x]=new I,c[x]=new I;const l=new I,h=new I,d=new I,u=new Ne,f=new Ne,g=new Ne,y=new I,m=new I;function p(x,T,P){l.fromBufferAttribute(n,x),h.fromBufferAttribute(n,T),d.fromBufferAttribute(n,P),u.fromBufferAttribute(s,x),f.fromBufferAttribute(s,T),g.fromBufferAttribute(s,P),h.sub(l),d.sub(l),f.sub(u),g.sub(u);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(y.copy(h).multiplyScalar(g.y).addScaledVector(d,-f.y).multiplyScalar(D),m.copy(d).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),o[x].add(y),o[T].add(y),o[P].add(y),c[x].add(m),c[T].add(m),c[P].add(m))}let M=this.groups;M.length===0&&(M=[{start:0,count:e.count}]);for(let x=0,T=M.length;x<T;++x){const P=M[x],D=P.start,O=P.count;for(let H=D,U=D+O;H<U;H+=3)p(e.getX(H+0),e.getX(H+1),e.getX(H+2))}const C=new I,v=new I,E=new I,b=new I;function A(x){E.fromBufferAttribute(i,x),b.copy(E);const T=o[x];C.copy(T),C.sub(E.multiplyScalar(E.dot(T))).normalize(),v.crossVectors(b,T);const D=v.dot(c[x])<0?-1:1;a.setXYZW(x,C.x,C.y,C.z,D)}for(let x=0,T=M.length;x<T;++x){const P=M[x],D=P.start,O=P.count;for(let H=D,U=D+O;H<U;H+=3)A(e.getX(H+0)),A(e.getX(H+1)),A(e.getX(H+2))}this._transformed=!0}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0||n.count!==t.count)n=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new I,s=new I,a=new I,o=new I,c=new I,l=new I,h=new I,d=new I;if(e)for(let u=0,f=e.count;u<f;u+=3){const g=e.getX(u+0),y=e.getX(u+1),m=e.getX(u+2);i.fromBufferAttribute(t,g),s.fromBufferAttribute(t,y),a.fromBufferAttribute(t,m),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,y),l.fromBufferAttribute(n,m),o.add(h),c.add(h),l.add(h),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(y,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=t.count;u<f;u+=3)i.fromBufferAttribute(t,u+0),s.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),h.subVectors(a,s),d.subVectors(i,s),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Nt.fromBufferAttribute(e,t),Nt.normalize(),e.setXYZ(t,Nt.x,Nt.y,Nt.z)}toNonIndexed(){function e(o,c){const l=o.array,h=o.itemSize,d=o.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let y=0,m=c.length;y<m;y++){o.isInterleavedBufferAttribute?f=c[y]*o.data.stride+o.offset:f=c[y]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new Yt(u,h,d)}if(this.index===null)return we("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Lt,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=e(c,n);t.setAttribute(o,l)}const s=this.morphAttributes;for(const o in s){const c=[],l=s[o];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=e(u,n);c.push(f)}t.morphAttributes[o]=c}t.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];t.addGroup(l.start,l.count,l.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(e[l]=c[l]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const c in n){const l=n[c];e.data.attributes[c]=l.toJSON(e.data)}const i={};let s=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(e.data))}h.length>0&&(i[c]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(t))}const s=e.morphAttributes;for(const l in s){const h=[],d=s[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(t));this.morphAttributes[l]=h}this.morphTargetsRelative=e.morphTargetsRelative;const a=e.groups;for(let l=0,h=a.length;l<h;l++){const d=a[l];this.addGroup(d.start,d.count,d.materialIndex)}const o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=e.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Nd{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Rd,this.updateRanges=[],this.version=0,this.uuid=Sn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Sn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));const t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}}const Wt=new I;class Ks{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyMatrix4(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.applyNormalMatrix(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Wt.fromBufferAttribute(this,t),Wt.transformDirection(e),this.setXYZ(t,Wt.x,Wt.y,Wt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=_n(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=at(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=at(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=_n(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=_n(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=_n(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=_n(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=at(t,this.array),n=at(n,this.array),i=at(i,this.array),s=at(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){Jr("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new Yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new Ks(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Jr("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const ka=new I,Mp=new I,Ep=new Oe;class Yn{constructor(e=new I(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=ka.subVectors(n,t).cross(Mp.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,n=!0){const i=e.delta(ka),s=this.normal.dot(i);if(s===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const a=-(e.start.dot(this.normal)+this.constant)/s;return n===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(i,a)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||Ep.getNormalMatrix(e),i=this.coplanarPoint(ka).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}}let bp=0;class Mn extends vi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:bp++}),this.uuid=Sn(),this.name="",this.type="Material",this.blending=Fs,this.side=_i,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=od,this.blendDst=cd,this.blendEquation=es,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ce(0,0,0),this.blendAlpha=0,this.depthFunc=zs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=If,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ya,this.stencilZFail=ya,this.stencilZPass=ya,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){we(`Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){we(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector2&&n&&n.isVector2||i&&i.isEuler&&n&&n.isEuler||i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,n.blending=this.blending,n.side=this.side,n.shadowSide=this.shadowSide,n.vertexColors=this.vertexColors,n.opacity=this.opacity,n.transparent=this.transparent,n.blendSrc=this.blendSrc,n.blendDst=this.blendDst,n.blendEquation=this.blendEquation,n.blendSrcAlpha=this.blendSrcAlpha,n.blendDstAlpha=this.blendDstAlpha,n.blendEquationAlpha=this.blendEquationAlpha,n.blendColor=this.blendColor.getHex(),n.blendAlpha=this.blendAlpha,n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.clipIntersection=this.clipIntersection,n.clipShadows=this.clipShadows,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,n.stencilWrite=this.stencilWrite,n.polygonOffset=this.polygonOffset,n.polygonOffsetFactor=this.polygonOffsetFactor,n.polygonOffsetUnits=this.polygonOffsetUnits,n.dithering=this.dithering,n.alphaTest=this.alphaTest,n.alphaHash=this.alphaHash,n.alphaToCoverage=this.alphaToCoverage,n.premultipliedAlpha=this.premultipliedAlpha,n.forceSinglePass=this.forceSinglePass,n.allowOverride=this.allowOverride,n.visible=this.visible,n.toneMapped=this.toneMapped,n.name=this.name,this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(n.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(n.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(n.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(n.clippingPlanes=this.clippingPlanes.map(s=>s.toJSON())),this.rotation!==void 0&&(n.rotation=this.rotation),this.depthPacking!==void 0&&(n.depthPacking=this.depthPacking),this.linewidth!==void 0&&(n.linewidth=this.linewidth),this.linecap!==void 0&&(n.linecap=this.linecap),this.linejoin!==void 0&&(n.linejoin=this.linejoin),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.wireframe!==void 0&&(n.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(n.flatShading=this.flatShading),this.fog!==void 0&&(n.fog=this.fog),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(s){const a=[];for(const o in s){const c=s[o];delete c.metadata,a.push(c)}return a}if(t){const s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ce().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(n=>new Yn().fromJSON(n))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let n=e.normalScale;Array.isArray(n)===!1&&(n=[n,n]),this.normalScale=new Ne().fromArray(n)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new Ne().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class Qr extends Mn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}let Wi;const Ms=new I,Xi=new I,qi=new I,Ki=new Ne,Es=new Ne,Fd=new ke,dr=new I,bs=new I,ur=new I,Ul=new Ne,za=new Ne,Ol=new Ne;class tc extends lt{constructor(e=new Qr){if(super(),this.isSprite=!0,this.type="Sprite",Wi===void 0){Wi=new Lt;const t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Nd(t,5);Wi.setIndex([0,1,2,0,2,3]),Wi.setAttribute("position",new Ks(n,3,0,!1)),Wi.setAttribute("uv",new Ks(n,2,3,!1))}this.geometry=Wi,this.material=e,this.center=new Ne(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Fe('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Xi.setFromMatrixScale(this.matrixWorld),Fd.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),qi.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Xi.multiplyScalar(-qi.z);const n=this.material.rotation;let i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));const a=this.center;fr(dr.set(-.5,-.5,0),qi,a,Xi,i,s),fr(bs.set(.5,-.5,0),qi,a,Xi,i,s),fr(ur.set(.5,.5,0),qi,a,Xi,i,s),Ul.set(0,0),za.set(1,0),Ol.set(1,1);let o=e.ray.intersectTriangle(dr,bs,ur,!1,Ms);if(o===null&&(fr(bs.set(-.5,.5,0),qi,a,Xi,i,s),za.set(0,1),o=e.ray.intersectTriangle(dr,ur,bs,!1,Ms),o===null))return;const c=e.ray.origin.distanceTo(Ms);c<e.near||c>e.far||t.push({distance:c,point:Ms.clone(),uv:an.getInterpolation(Ms,dr,bs,ur,Ul,za,Ol,new Ne),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}}function fr(r,e,t,n,i,s){Ki.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(Es.x=s*Ki.x-i*Ki.y,Es.y=i*Ki.x+s*Ki.y):Es.copy(Ki),r.copy(e),r.x+=Es.x,r.y+=Es.y,r.applyMatrix4(Fd)}const Kn=new I,Ga=new I,pr=new I,mr=new I;class Qs{constructor(e=new I,t=new I(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Kn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Kn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Kn.copy(this.origin).addScaledVector(this.direction,t),Kn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Ga.copy(e).add(t).multiplyScalar(.5),pr.copy(t).sub(e).normalize(),mr.copy(this.origin).sub(Ga);const s=e.distanceTo(t)*.5,a=-this.direction.dot(pr),o=mr.dot(this.direction),c=-mr.dot(pr),l=mr.lengthSq(),h=Math.abs(1-a*a);let d,u,f,g;if(h>0)if(d=a*c-o,u=a*o-c,g=s*h,d>=0)if(u>=-g)if(u<=g){const y=1/h;d*=y,u*=y,f=d*(d+a*u+2*o)+u*(a*d+u+2*c)+l}else u=s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u=-s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-a*s+o)),u=d>0?-s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-s,-c),s),f=u*(u+2*c)+l):(d=Math.max(0,-(a*s+o)),u=d>0?s:Math.min(Math.max(-s,-c),s),f=-d*d+u*(u+2*c)+l);else u=a>0?-s:s,d=Math.max(0,-(a*u+o)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ga).addScaledVector(pr,u),f}intersectSphere(e,t){if(e.radius<0)return null;Kn.subVectors(e.center,this.origin);const n=Kn.dot(this.direction),i=Kn.dot(Kn)-n*n,s=e.radius*e.radius;if(i>s)return null;const a=Math.sqrt(s-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(e.min.x-u.x)*l,i=(e.max.x-u.x)*l):(n=(e.max.x-u.x)*l,i=(e.min.x-u.x)*l),h>=0?(s=(e.min.y-u.y)*h,a=(e.max.y-u.y)*h):(s=(e.max.y-u.y)*h,a=(e.min.y-u.y)*h),n>a||s>i||((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),d>=0?(o=(e.min.z-u.z)*d,c=(e.max.z-u.z)*d):(o=(e.max.z-u.z)*d,c=(e.min.z-u.z)*d),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Kn)!==null}intersectTriangle(e,t,n,i,s){const a=this.origin,o=this.direction,c=o.x,l=o.y,h=o.z,d=e.x-a.x,u=e.y-a.y,f=e.z-a.z,g=t.x-a.x,y=t.y-a.y,m=t.z-a.z,p=n.x-a.x,M=n.y-a.y,C=n.z-a.z,v=Math.abs(c),E=Math.abs(l),b=Math.abs(h);let A,x,T,P,D,O,H,U,G,Z,X,ie;if(v>=E&&v>=b?(T=c,O=d,G=g,ie=p,c>=0?(A=l,x=h,P=u,D=f,H=y,U=m,Z=M,X=C):(A=h,x=l,P=f,D=u,H=m,U=y,Z=C,X=M)):E>=b?(T=l,O=u,G=y,ie=M,l>=0?(A=h,x=c,P=f,D=d,H=m,U=g,Z=C,X=p):(A=c,x=h,P=d,D=f,H=g,U=m,Z=p,X=C)):(T=h,O=f,G=m,ie=C,h>=0?(A=c,x=l,P=d,D=u,H=g,U=y,Z=p,X=M):(A=l,x=c,P=u,D=d,H=y,U=g,Z=M,X=p)),T===0)return null;const K=A/T,ee=x/T,ne=1/T,Le=P-K*O,Ae=D-ee*O,dt=H-K*G,Ye=U-ee*G,Je=Z-K*ie,$=X-ee*ie,Q=Je*Ye-$*dt,xe=Le*$-Ae*Je,Ue=dt*Ae-Ye*Le;if(i){if(Q<0||xe<0||Ue<0)return null}else if((Q<0||xe<0||Ue<0)&&(Q>0||xe>0||Ue>0))return null;const ge=Q+xe+Ue;if(ge===0)return null;const He=ne*(Q*O+xe*G+Ue*ie);return(ge>0?He<0:He>0)?null:this.at(He/ge,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class jn extends Mn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ce(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.combine=ld,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Bl=new ke,Ei=new Qs,gr=new Gn,kl=new I,_r=new I,xr=new I,vr=new I,Ha=new I,Sr=new I,zl=new I,yr=new I;class Pe extends lt{constructor(e=new Lt,t=new jn){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const o=this.morphTargetInfluences;if(s&&o){Sr.set(0,0,0);for(let c=0,l=s.length;c<l;c++){const h=o[c],d=s[c];h!==0&&(Ha.fromBufferAttribute(d,e),a?Sr.addScaledVector(Ha,h):Sr.addScaledVector(Ha.sub(t),h))}t.add(Sr)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.material,s=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),gr.copy(n.boundingSphere),gr.applyMatrix4(s),Ei.copy(e.ray).recast(e.near),!(gr.containsPoint(Ei.origin)===!1&&(Ei.intersectSphere(gr,kl)===null||Ei.origin.distanceToSquared(kl)>(e.far-e.near)**2))&&(Bl.copy(s).invert(),Ei.copy(e.ray).applyMatrix4(Bl),!(n.boundingBox!==null&&Ei.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,Ei)))}_computeIntersections(e,t,n){let i;const s=this.geometry,a=this.material,o=s.index,c=s.attributes.position,l=s.attributes.uv,h=s.attributes.uv1,d=s.attributes.normal,u=s.groups,f=s.drawRange;if(o!==null)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),C=Math.min(o.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,E=C;v<E;v+=3){const b=o.getX(v),A=o.getX(v+1),x=o.getX(v+2);i=Mr(this,p,e,n,l,h,d,b,A,x),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),y=Math.min(o.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){const M=o.getX(m),C=o.getX(m+1),v=o.getX(m+2);i=Mr(this,a,e,n,l,h,d,M,C,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}else if(c!==void 0)if(Array.isArray(a))for(let g=0,y=u.length;g<y;g++){const m=u[g],p=a[m.materialIndex],M=Math.max(m.start,f.start),C=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let v=M,E=C;v<E;v+=3){const b=v,A=v+1,x=v+2;i=Mr(this,p,e,n,l,h,d,b,A,x),i&&(i.faceIndex=Math.floor(v/3),i.face.materialIndex=m.materialIndex,t.push(i))}}else{const g=Math.max(0,f.start),y=Math.min(c.count,f.start+f.count);for(let m=g,p=y;m<p;m+=3){const M=m,C=m+1,v=m+2;i=Mr(this,a,e,n,l,h,d,M,C,v),i&&(i.faceIndex=Math.floor(m/3),t.push(i))}}}}function Tp(r,e,t,n,i,s,a,o){let c;if(e.side===$t?c=n.intersectTriangle(a,s,i,!0,o):c=n.intersectTriangle(i,s,a,e.side===_i,o),c===null)return null;yr.copy(o),yr.applyMatrix4(r.matrixWorld);const l=t.ray.origin.distanceTo(yr);return l<t.near||l>t.far?null:{distance:l,point:yr.clone(),object:r}}function Mr(r,e,t,n,i,s,a,o,c,l){r.getVertexPosition(o,_r),r.getVertexPosition(c,xr),r.getVertexPosition(l,vr);const h=Tp(r,e,t,n,_r,xr,vr,zl);if(h){const d=new I;an.getBarycoord(zl,_r,xr,vr,d),i&&(h.uv=an.getInterpolatedAttribute(i,o,c,l,d,new Ne)),s&&(h.uv1=an.getInterpolatedAttribute(s,o,c,l,d,new Ne)),a&&(h.normal=an.getInterpolatedAttribute(a,o,c,l,d,new I),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a:o,b:c,c:l,normal:new I,materialIndex:0};an.getNormal(_r,xr,vr,u.normal),h.face=u,h.barycoord=d}return h}const Ts=new ct,Gl=new ct,Hl=new ct,wp=new ct,Vl=new ke,Er=new I,Va=new Gn,Wl=new ke,Wa=new Qs;class Ap extends Pe{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Sl,this.bindMatrix=new ke,this.bindMatrixInverse=new ke,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new en),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Er),this.boundingBox.expandByPoint(Er)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Gn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Er),this.boundingSphere.expandByPoint(Er)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Va.copy(this.boundingSphere),Va.applyMatrix4(i),e.ray.intersectsSphere(Va)!==!1&&(Wl.copy(i).invert(),Wa.copy(e.ray).applyMatrix4(Wl),!(this.boundingBox!==null&&Wa.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,Wa)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ct,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Sl?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===Tf?this.bindMatrixInverse.copy(this.bindMatrix).invert():we("SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;Gl.fromBufferAttribute(i.attributes.skinIndex,e),Hl.fromBufferAttribute(i.attributes.skinWeight,e),t.isVector4?(Ts.copy(t),t.set(0,0,0,0)):(Ts.set(...t,1),t.set(0,0,0)),Ts.applyMatrix4(this.bindMatrix);for(let s=0;s<4;s++){const a=Hl.getComponent(s);if(a!==0){const o=Gl.getComponent(s);Vl.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(wp.copy(Ts).applyMatrix4(Vl),a)}}return t.isVector4&&(t.w=Ts.w),t.applyMatrix4(this.bindMatrixInverse)}}class Ud extends lt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class Dc extends St{constructor(e=null,t=1,n=1,i,s,a,o,c,l=At,h=At,d,u){super(null,a,o,c,l,h,i,s,d,u),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const Xl=new ke,Rp=new ke;class Nc{constructor(e=[],t=[]){this.uuid=Sn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){we("Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new ke)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new ke;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){const o=e[s]?e[s].matrixWorld:Rp;Xl.multiplyMatrices(o,t[s]),Xl.toArray(n,s*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new Nc(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new Dc(t,e,e,cn,on);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const s=e.bones[n];let a=t[s];a===void 0&&(we("Skeleton: No bone found with UUID:",s),a=new Ud),this.bones.push(a),this.boneInverses.push(new ke().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){const a=t[i];e.bones.push(a.uuid);const o=n[i];e.boneInverses.push(o.toArray())}return e}}class ea extends Yt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const $i=new ke,ql=new ke,br=[],Kl=new en,Cp=new ke,ws=new Pe,As=new Gn;class Jt extends Pe{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ea(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Cp)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new en),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$i),Kl.copy(e.boundingBox).applyMatrix4($i),this.boundingBox.union(Kl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Gn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,$i),As.copy(e.boundingSphere).applyMatrix4($i),this.boundingSphere.union(As)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){return this.instanceColor===null?t.setRGB(1,1,1):t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){return t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=n.length+1,a=e*s+1;for(let o=0;o<n.length;o++)n[o]=i[a+o]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),As.copy(this.boundingSphere),As.applyMatrix4(n),e.ray.intersectsSphere(As)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,$i),ql.multiplyMatrices(n,$i),ws.matrixWorld=ql,ws.raycast(e,br);for(let a=0,o=br.length;a<o;a++){const c=br[a];c.instanceId=s,c.object=this,t.push(c)}br.length=0}}setColorAt(e,t){return this.instanceColor===null&&(this.instanceColor=new ea(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3),this}setMatrixAt(e,t){return t.toArray(this.instanceMatrix.array,e*16),this}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Dc(new Float32Array(i*this.count),i,this.count,Mc,on));const s=this.morphTexture.source.data.data;let a=0;for(let l=0;l<n.length;l++)a+=n[l];const o=this.geometry.morphTargetsRelative?1:1-a,c=i*e;return s[c]=o,s.set(n,c+1),this}updateMorphTargets(){}dispose(){super.dispose(),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const bi=new Gn,Pp=new Ne(.5,.5),Tr=new I;class Fc{constructor(e=new Yn,t=new Yn,n=new Yn,i=new Yn,s=new Yn,a=new Yn){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){const o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=Fn,n=!1){const i=this.planes,s=e.elements,a=s[0],o=s[1],c=s[2],l=s[3],h=s[4],d=s[5],u=s[6],f=s[7],g=s[8],y=s[9],m=s[10],p=s[11],M=s[12],C=s[13],v=s[14],E=s[15];if(i[0].setComponents(l-a,f-h,p-g,E-M).normalize(),i[1].setComponents(l+a,f+h,p+g,E+M).normalize(),i[2].setComponents(l+o,f+d,p+y,E+C).normalize(),i[3].setComponents(l-o,f-d,p-y,E-C).normalize(),n)i[4].setComponents(c,u,m,v).normalize(),i[5].setComponents(l-c,f-u,p-m,E-v).normalize();else if(i[4].setComponents(l-c,f-u,p-m,E-v).normalize(),t===Fn)i[5].setComponents(l+c,f+u,p+m,E+v).normalize();else if(t===Xs)i[5].setComponents(c,u,m,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),bi.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),bi.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(bi)}intersectsSprite(e){bi.center.set(0,0,0);const t=Pp.distanceTo(e.center);return bi.radius=.7071067811865476+t,bi.applyMatrix4(e.matrixWorld),this.intersectsSphere(bi)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if(Tr.x=i.normal.x>0?e.max.x:e.min.x,Tr.y=i.normal.y>0?e.max.y:e.min.y,Tr.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(Tr)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Od extends Mn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Ce(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const ta=new I,na=new I,$l=new ke,Rs=new Qs,wr=new Gn,Xa=new I,Yl=new I;class Uc extends lt{constructor(e=new Lt,t=new Od){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)ta.fromBufferAttribute(t,i-1),na.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=ta.distanceTo(na);e.setAttribute("lineDistance",new mt(n,1))}else we("Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),wr.copy(n.boundingSphere),wr.applyMatrix4(i),wr.radius+=s,e.ray.intersectsSphere(wr)===!1)return;$l.copy(i).invert(),Rs.copy(e.ray).applyMatrix4($l);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){const f=Math.max(0,a.start),g=Math.min(h.count,a.start+a.count);for(let y=f,m=g-1;y<m;y+=l){const p=h.getX(y),M=h.getX(y+1),C=Ar(this,e,Rs,c,p,M,y);C&&t.push(C)}if(this.isLineLoop){const y=h.getX(g-1),m=h.getX(f),p=Ar(this,e,Rs,c,y,m,g-1);p&&t.push(p)}}else{const f=Math.max(0,a.start),g=Math.min(u.count,a.start+a.count);for(let y=f,m=g-1;y<m;y+=l){const p=Ar(this,e,Rs,c,y,y+1,y);p&&t.push(p)}if(this.isLineLoop){const y=Ar(this,e,Rs,c,g-1,f,g-1);y&&t.push(y)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ar(r,e,t,n,i,s,a){const o=r.geometry.attributes.position;if(ta.fromBufferAttribute(o,i),na.fromBufferAttribute(o,s),t.distanceSqToSegment(ta,na,Xa,Yl)>n)return;Xa.applyMatrix4(r.matrixWorld);const l=e.ray.origin.distanceTo(Xa);if(!(l<e.near||l>e.far))return{distance:l,point:Yl.clone().applyMatrix4(r.matrixWorld),index:a,face:null,faceIndex:null,barycoord:null,object:r}}const Zl=new I,jl=new I;class Ip extends Uc{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Zl.fromBufferAttribute(t,i),jl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Zl.distanceTo(jl);e.setAttribute("lineDistance",new mt(n,1))}else we("LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class Lp extends Uc{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Bd extends Mn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ce(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const Jl=new ke,nc=new Qs,Rr=new Gn,Cr=new I;class Dp extends lt{constructor(e=new Lt,t=new Bd){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){const n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Rr.copy(n.boundingSphere),Rr.applyMatrix4(i),Rr.radius+=s,e.ray.intersectsSphere(Rr)===!1)return;Jl.copy(i).invert(),nc.copy(e.ray).applyMatrix4(Jl);const o=s/((this.scale.x+this.scale.y+this.scale.z)/3),c=o*o,l=n.index,d=n.attributes.position;if(l!==null){const u=Math.max(0,a.start),f=Math.min(l.count,a.start+a.count);for(let g=u,y=f;g<y;g++){const m=l.getX(g);Cr.fromBufferAttribute(d,m),Ql(Cr,m,c,i,e,t,this)}}else{const u=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let g=u,y=f;g<y;g++)Cr.fromBufferAttribute(d,g),Ql(Cr,g,c,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,a=i.length;s<a;s++){const o=i[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=s}}}}}function Ql(r,e,t,n,i,s,a){const o=nc.distanceSqToPoint(r);if(o<t){const c=new I;nc.closestPointToPoint(r,c),c.applyMatrix4(n);const l=i.ray.origin.distanceTo(c);if(l<i.near||l>i.far)return;s.push({distance:l,distanceToRay:Math.sqrt(o),point:c,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}class kd extends St{constructor(e=[],t=Pi,n,i,s,a,o,c,l,h){super(e,t,n,i,s,a,o,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class $s extends St{constructor(e,t,n=On,i,s,a,o=At,c=At,l,h=ti,d=1){if(h!==ti&&h!==Ai)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const u={width:e,height:t,depth:d};super(u,i,s,a,o,c,h,n,l),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Pc(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}}class Np extends $s{constructor(e,t=On,n=Pi,i,s,a=At,o=At,c,l=ti){const h={width:e,height:e,depth:1},d=[h,h,h,h,h,h];super(e,e,t,n,i,s,a,o,c,l),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}}class zd extends St{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}}class st extends Lt{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};const o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,t,e,a,s,0),g("z","y","x",1,-1,n,t,-e,a,s,1),g("x","z","y",1,1,e,n,t,i,a,2),g("x","z","y",1,-1,e,n,-t,i,a,3),g("x","y","z",1,-1,e,t,n,i,s,4),g("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(c),this.setAttribute("position",new mt(l,3)),this.setAttribute("normal",new mt(h,3)),this.setAttribute("uv",new mt(d,2));function g(y,m,p,M,C,v,E,b,A,x,T){const P=v/A,D=E/x,O=v/2,H=E/2,U=b/2,G=A+1,Z=x+1;let X=0,ie=0;const K=new I;for(let ee=0;ee<Z;ee++){const ne=ee*D-H;for(let Le=0;Le<G;Le++){const Ae=Le*P-O;K[y]=Ae*M,K[m]=ne*C,K[p]=U,l.push(K.x,K.y,K.z),K[y]=0,K[m]=0,K[p]=b>0?1:-1,h.push(K.x,K.y,K.z),d.push(Le/A),d.push(1-ee/x),X+=1}}for(let ee=0;ee<x;ee++)for(let ne=0;ne<A;ne++){const Le=u+ne+G*ee,Ae=u+ne+G*(ee+1),dt=u+(ne+1)+G*(ee+1),Ye=u+(ne+1)+G*ee;c.push(Le,Ae,Ye),c.push(Ae,dt,Ye),ie+=6}o.addGroup(f,ie,T),f+=ie,u+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new st(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}class Oc extends Lt{constructor(e=1,t=1,n=4,i=8,s=1){super(),this.type="CapsuleGeometry",this.parameters={radius:e,height:t,capSegments:n,radialSegments:i,heightSegments:s},t=Math.max(0,t),n=Math.max(1,Math.floor(n)),i=Math.max(3,Math.floor(i)),s=Math.max(1,Math.floor(s));const a=[],o=[],c=[],l=[],h=t/2,d=Math.PI/2*e,u=t,f=2*d+u,g=n*2+s,y=i+1,m=new I,p=new I;for(let M=0;M<=g;M++){let C=0,v=0,E=0,b=0;if(M<=n){const T=M/n,P=T*Math.PI/2;v=-h-e*Math.cos(P),E=e*Math.sin(P),b=-e*Math.cos(P),C=T*d}else if(M<=n+s){const T=(M-n)/s;v=-h+T*t,E=e,b=0,C=d+T*u}else{const T=(M-n-s)/n,P=T*Math.PI/2;v=h+e*Math.sin(P),E=e*Math.cos(P),b=e*Math.sin(P),C=d+u+T*d}const A=Math.max(0,Math.min(1,C/f));let x=0;M===0?x=.5/i:M===g&&(x=-.5/i);for(let T=0;T<=i;T++){const P=T/i,D=P*Math.PI*2,O=Math.sin(D),H=Math.cos(D);p.x=-E*H,p.y=v,p.z=E*O,o.push(p.x,p.y,p.z),m.set(-E*H,b,E*O),m.normalize(),c.push(m.x,m.y,m.z),l.push(P+x,A)}if(M>0){const T=(M-1)*y;for(let P=0;P<i;P++){const D=T+P,O=T+P+1,H=M*y+P,U=M*y+P+1;a.push(D,O,H),a.push(O,U,H)}}}this.setIndex(a),this.setAttribute("position",new mt(o,3)),this.setAttribute("normal",new mt(c,3)),this.setAttribute("uv",new mt(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Oc(e.radius,e.height,e.capSegments,e.radialSegments,e.heightSegments)}}class gi extends Lt{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:c};const l=this;i=Math.floor(i),s=Math.floor(s);const h=[],d=[],u=[],f=[];let g=0;const y=[],m=n/2;let p=0;M(),a===!1&&(e>0&&C(!0),t>0&&C(!1)),this.setIndex(h),this.setAttribute("position",new mt(d,3)),this.setAttribute("normal",new mt(u,3)),this.setAttribute("uv",new mt(f,2));function M(){const v=new I,E=new I;let b=0;const A=(t-e)/n;for(let x=0;x<=s;x++){const T=[],P=x/s,D=P*(t-e)+e;for(let O=0;O<=i;O++){const H=O/i,U=H*c+o,G=Math.sin(U),Z=Math.cos(U);E.x=D*G,E.y=-P*n+m,E.z=D*Z,d.push(E.x,E.y,E.z),v.set(G,A,Z).normalize(),u.push(v.x,v.y,v.z),f.push(H,1-P),T.push(g++)}y.push(T)}for(let x=0;x<i;x++)for(let T=0;T<s;T++){const P=y[T][x],D=y[T+1][x],O=y[T+1][x+1],H=y[T][x+1];(e>0||T!==0)&&(h.push(P,D,H),b+=3),(t>0||T!==s-1)&&(h.push(D,O,H),b+=3)}l.addGroup(p,b,0),p+=b}function C(v){const E=g,b=new Ne,A=new I;let x=0;const T=v===!0?e:t,P=v===!0?1:-1;for(let O=1;O<=i;O++)d.push(0,m*P,0),u.push(0,P,0),f.push(.5,.5),g++;const D=g;for(let O=0;O<=i;O++){const U=O/i*c+o,G=Math.cos(U),Z=Math.sin(U);A.x=T*Z,A.y=m*P,A.z=T*G,d.push(A.x,A.y,A.z),u.push(0,P,0),b.x=G*.5+.5,b.y=Z*.5*P+.5,f.push(b.x,b.y),g++}for(let O=0;O<i;O++){const H=E+O,U=D+O;v===!0?h.push(U,U+1,H):h.push(U+1,U,H),x+=3}l.addGroup(p,x,v===!0?1:2),p+=x}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new gi(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class er extends gi{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=Math.PI*2){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new er(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}}class oa extends Lt{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};const s=[],a=[];o(i),l(n),h(),this.setAttribute("position",new mt(s,3)),this.setAttribute("normal",new mt(s.slice(),3)),this.setAttribute("uv",new mt(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function o(M){const C=new I,v=new I,E=new I;for(let b=0;b<t.length;b+=3)f(t[b+0],C),f(t[b+1],v),f(t[b+2],E),c(C,v,E,M)}function c(M,C,v,E){const b=E+1,A=[];for(let x=0;x<=b;x++){A[x]=[];const T=M.clone().lerp(v,x/b),P=C.clone().lerp(v,x/b),D=b-x;for(let O=0;O<=D;O++)O===0&&x===b?A[x][O]=T:A[x][O]=T.clone().lerp(P,O/D)}for(let x=0;x<b;x++)for(let T=0;T<2*(b-x)-1;T++){const P=Math.floor(T/2);T%2===0?(u(A[x][P+1]),u(A[x+1][P]),u(A[x][P])):(u(A[x][P+1]),u(A[x+1][P+1]),u(A[x+1][P]))}}function l(M){const C=new I;for(let v=0;v<s.length;v+=3)C.x=s[v+0],C.y=s[v+1],C.z=s[v+2],C.normalize().multiplyScalar(M),s[v+0]=C.x,s[v+1]=C.y,s[v+2]=C.z}function h(){const M=new I;for(let C=0;C<s.length;C+=3){M.x=s[C+0],M.y=s[C+1],M.z=s[C+2];const v=m(M)/2/Math.PI+.5,E=p(M)/Math.PI+.5;a.push(v,1-E)}g(),d()}function d(){for(let M=0;M<a.length;M+=6){const C=a[M+0],v=a[M+2],E=a[M+4],b=Math.max(C,v,E),A=Math.min(C,v,E);b>.9&&A<.1&&(C<.2&&(a[M+0]+=1),v<.2&&(a[M+2]+=1),E<.2&&(a[M+4]+=1))}}function u(M){s.push(M.x,M.y,M.z)}function f(M,C){const v=M*3;C.x=e[v+0],C.y=e[v+1],C.z=e[v+2]}function g(){const M=new I,C=new I,v=new I,E=new I,b=new Ne,A=new Ne,x=new Ne;for(let T=0,P=0;T<s.length;T+=9,P+=6){M.set(s[T+0],s[T+1],s[T+2]),C.set(s[T+3],s[T+4],s[T+5]),v.set(s[T+6],s[T+7],s[T+8]),b.set(a[P+0],a[P+1]),A.set(a[P+2],a[P+3]),x.set(a[P+4],a[P+5]),E.copy(M).add(C).add(v).divideScalar(3);const D=m(E);y(b,P+0,M,D),y(A,P+2,C,D),y(x,P+4,v,D)}}function y(M,C,v,E){E<0&&M.x===1&&(a[C]=M.x-1),v.x===0&&v.z===0&&(a[C]=E/2/Math.PI+.5)}function m(M){return Math.atan2(M.z,-M.x)}function p(M){return Math.atan2(-M.y,Math.sqrt(M.x*M.x+M.z*M.z))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new oa(e.vertices,e.indices,e.radius,e.detail)}}class Ys extends oa{constructor(e=1,t=0){const n=(1+Math.sqrt(5))/2,i=1/n,s=[-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],a=[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9];super(s,a,e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Ys(e.radius,e.detail)}}class Bc extends oa{constructor(e=1,t=0){const n=[1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],i=[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2];super(n,i,e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new Bc(e.radius,e.detail)}}class En extends Lt{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const s=e/2,a=t/2,o=Math.floor(n),c=Math.floor(i),l=o+1,h=c+1,d=e/o,u=t/c,f=[],g=[],y=[],m=[];for(let p=0;p<h;p++){const M=p*u-a;for(let C=0;C<l;C++){const v=C*d-s;g.push(v,-M,0),y.push(0,0,1),m.push(C/o),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let M=0;M<o;M++){const C=M+l*p,v=M+l*(p+1),E=M+1+l*(p+1),b=M+1+l*p;f.push(C,v,b),f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(y,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new En(e.width,e.height,e.widthSegments,e.heightSegments)}}class kc extends Lt{constructor(e=.5,t=1,n=32,i=1,s=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n),i=Math.max(1,i);const o=[],c=[],l=[],h=[];let d=e;const u=(t-e)/i,f=new I,g=new Ne;for(let y=0;y<=i;y++){for(let m=0;m<=n;m++){const p=s+m/n*a;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/t+1)/2,g.y=(f.y/t+1)/2,h.push(g.x,g.y)}d+=u}for(let y=0;y<i;y++){const m=y*(n+1);for(let p=0;p<n;p++){const M=p+m,C=M,v=M+n+1,E=M+n+2,b=M+1;o.push(C,v,b),o.push(v,E,b)}}this.setIndex(o),this.setAttribute("position",new mt(c,3)),this.setAttribute("normal",new mt(l,3)),this.setAttribute("uv",new mt(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new kc(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}}class Ci extends Lt{constructor(e=1,t=32,n=16,i=0,s=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));const c=Math.min(a+o,Math.PI);let l=0;const h=[],d=new I,u=new I,f=[],g=[],y=[],m=[];for(let p=0;p<=n;p++){const M=[],C=p/n,v=a+C*o,E=e*Math.cos(v),b=Math.sqrt(e*e-E*E);let A=0;p===0&&a===0?A=.5/t:p===n&&c===Math.PI&&(A=-.5/t);for(let x=0;x<=t;x++){const T=x/t,P=i+T*s;d.x=-b*Math.cos(P),d.y=E,d.z=b*Math.sin(P),g.push(d.x,d.y,d.z),u.copy(d).normalize(),y.push(u.x,u.y,u.z),m.push(T+A,1-C),M.push(l++)}h.push(M)}for(let p=0;p<n;p++)for(let M=0;M<t;M++){const C=h[p][M+1],v=h[p][M],E=h[p+1][M],b=h[p+1][M+1];(p!==0||a>0)&&f.push(C,v,b),(p!==n-1||c<Math.PI)&&f.push(v,E,b)}this.setIndex(f),this.setAttribute("position",new mt(g,3)),this.setAttribute("normal",new mt(y,3)),this.setAttribute("uv",new mt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ci(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}}function hs(r){const e={};for(const t in r){e[t]={};for(const n in r[t]){const i=r[t][n];if(eh(i))i.isRenderTargetTexture?(we("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone();else if(Array.isArray(i))if(eh(i[0])){const s=[];for(let a=0,o=i.length;a<o;a++)s[a]=i[a].clone();e[t][n]=s}else e[t][n]=i.slice();else e[t][n]=i}}return e}function Xt(r){const e={};for(let t=0;t<r.length;t++){const n=hs(r[t]);for(const i in n)e[i]=n[i]}return e}function eh(r){return r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)}function Fp(r){const e=[];for(let t=0;t<r.length;t++)e.push(r[t].clone());return e}function Gd(r){const e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:qe.workingColorSpace}const Up={clone:hs,merge:Xt};var Op=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Bp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class kn extends Mn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Op,this.fragmentShader=Bp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=Fp(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?t.uniforms[i]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[i]={type:"m4",value:a.toArray()}:t.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(const n in e.uniforms){const i=e.uniforms[n];switch(this.uniforms[n]={},i.type){case"t":this.uniforms[n].value=t[i.value]||null;break;case"c":this.uniforms[n].value=new Ce().setHex(i.value);break;case"v2":this.uniforms[n].value=new Ne().fromArray(i.value);break;case"v3":this.uniforms[n].value=new I().fromArray(i.value);break;case"v4":this.uniforms[n].value=new ct().fromArray(i.value);break;case"m3":this.uniforms[n].value=new Oe().fromArray(i.value);break;case"m4":this.uniforms[n].value=new ke().fromArray(i.value);break;default:this.uniforms[n].value=i.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(const n in e.extensions)this.extensions[n]=e.extensions[n];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}}class kp extends kn{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class ve extends Mn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Ce(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ce(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=ec,this.normalScale=new Ne(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new xi,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class Hn extends ve{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Ne(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ce(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ce(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ce(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._retroreflectivity=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get retroreflectivity(){return this._retroreflectivity}set retroreflectivity(e){this._retroreflectivity>0!=e>0&&this.version++,this._retroreflectivity=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.retroreflectivity=e.retroreflectivity,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class zp extends Mn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class Gp extends Mn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function fi(r,e){return!r||r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function Vr(r){return r!==void 0&&r.inTangents!==void 0&&r.outTangents!==void 0}function Hp(r){function e(i,s){return r[i]-r[s]}const t=r.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function th(r,e,t){const n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){const o=t[s]*e;for(let c=0;c!==e;++c)i[a++]=r[o+c]}return i}function Vp(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push(...a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}class ds{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],s=t[n-1];e:{t:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break t}a=t.length;break n}if(!(e>=s)){const o=t[1];e<o&&(n=2,s=o);for(let c=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===c)break;if(i=s,s=t[--n-1],e>=s)break t}a=n,n=0;break n}break e}for(;n<a;){const o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}}class Wp extends ds{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:ts,endingEnd:ts}}intervalChanged_(e,t,n){const i=this.parameterPositions;let s=e-2,a=e+1,o=i[s],c=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case ns:s=e,o=2*t-n;break;case Zr:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(c===void 0)switch(this.getSettings_().endingEnd){case ns:a=e,c=2*n-t;break;case Zr:a=1,c=n+i[1]-i[0];break;default:a=e-1,c=t}const l=(n-t)*.5,h=this.valueSize;this._weightPrev=l/(t-o),this._weightNext=l/(c-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this._offsetPrev,d=this._offsetNext,u=this._weightPrev,f=this._weightNext,g=(n-t)/(i-t),y=g*g,m=y*g,p=-u*m+2*u*y-u*g,M=(1+u)*m+(-1.5-2*u)*y+(-.5+u)*g+1,C=(-1-f)*m+(1.5+f)*y+.5*g,v=f*m-f*y;for(let E=0;E!==o;++E)s[E]=p*a[h+E]+M*a[l+E]+C*a[c+E]+v*a[d+E];return s}}class Hd extends ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=(n-t)/(i-t),d=1-h;for(let u=0;u!==o;++u)s[u]=a[l+u]*d+a[c+u]*h;return s}}class Xp extends ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class qp extends ds{interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=e*o,l=c-o,h=this.inTangents,d=this.outTangents;if(!h||!d){const g=(n-t)/(i-t),y=1-g;for(let m=0;m!==o;++m)s[m]=a[l+m]*y+a[c+m]*g;return s}const u=o*2,f=e-1;for(let g=0;g!==o;++g){const y=a[l+g],m=a[c+g],p=f*u+g*2,M=d[p],C=d[p+1],v=e*u+g*2,E=h[v],b=h[v+1],A=$p(n,t,M,E,i);s[g]=Vd(A,y,C,b,m)}return s}}function Vd(r,e,t,n,i){const s=1-r;return s*s*s*e+3*s*s*r*t+3*s*r*r*n+r*r*r*i}function Kp(r,e,t,n,i){const s=1-r;return 3*s*s*(t-e)+6*s*r*(n-t)+3*r*r*(i-n)}function $p(r,e,t,n,i){let s=(r-e)/(i-e);for(let a=0;a<8;a++){const o=Vd(s,e,t,n,i)-r;if(Math.abs(o)<1e-10)break;const c=Kp(s,e,t,n,i);if(Math.abs(c)<1e-10)break;s=Math.max(0,Math.min(1,s-o/c))}return s}class bn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=fi(t,this.TimeBufferType),this.values=fi(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:fi(e.times,Array),values:fi(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i),Vr(e.settings)&&(n.settings={inTangents:fi(e.settings.inTangents,Array),outTangents:fi(e.settings.outTangents,Array)})}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Xp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Hd(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Wp(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){const t=new qp(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Vs:t=this.InterpolantFactoryMethodDiscrete;break;case Ws:t=this.InterpolantFactoryMethodLinear;break;case Sa:t=this.InterpolantFactoryMethodSmooth;break;case yl:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return we("KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Vs;case this.InterpolantFactoryMethodLinear:return Ws;case this.InterpolantFactoryMethodSmooth:return Sa;case this.InterpolantFactoryMethodBezier:return yl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e;Vr(this.settings)&&(nh(this.settings.inTangents,e),nh(this.settings.outTangents,e))}return this}trim(e,t){const n=this.times,i=n.length;let s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);const o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(Fe("KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,s=n.length;s===0&&(Fe("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){const c=n[o];if(typeof c=="number"&&isNaN(c)){Fe("KeyframeTrack: Time is not a valid number.",this,o,c),e=!1;break}if(a!==null&&a>c){Fe("KeyframeTrack: Out of order keys.",this,o,c,a),e=!1;break}a=c}if(i!==void 0&&kf(i))for(let o=0,c=i.length;o!==c;++o){const l=i[o];if(isNaN(l)){Fe("KeyframeTrack: Value is not a valid number.",this,o,l),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Sa,s=e.length-1;let a=1;for(let o=1;o<s;++o){let c=!1;const l=e[o],h=e[o+1];if(l!==h&&(o!==1||l!==e[0]))if(i)c=!0;else{const d=o*n,u=d-n,f=d+n;for(let g=0;g!==n;++g){const y=t[d+g];if(y!==t[u+g]||y!==t[f+g]){c=!0;break}}}if(c){if(o!==a){e[a]=e[o];const d=o*n,u=a*n;for(let f=0;f!==n;++f)t[u+f]=t[d+f]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,c=a*n,l=0;l!==n;++l)t[c+l]=t[o+l];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,Vr(this.settings)&&(i.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),i}}function nh(r,e){for(let t=0,n=r.length;t!==n;t+=2)r[t]*=e}bn.prototype.ValueTypeName="";bn.prototype.TimeBufferType=Float32Array;bn.prototype.ValueBufferType=Float32Array;bn.prototype.DefaultInterpolation=Ws;class us extends bn{constructor(e,t,n){super(e,t,n)}}us.prototype.ValueTypeName="bool";us.prototype.ValueBufferType=Array;us.prototype.DefaultInterpolation=Vs;us.prototype.InterpolantFactoryMethodLinear=void 0;us.prototype.InterpolantFactoryMethodSmooth=void 0;class Wd extends bn{constructor(e,t,n,i){super(e,t,n,i)}}Wd.prototype.ValueTypeName="color";class Zs extends bn{constructor(e,t,n,i){super(e,t,n,i)}}Zs.prototype.ValueTypeName="number";class Yp extends ds{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=(n-t)/(i-t);let l=e*o;for(let h=l+o;l!==h;l+=4)hn.slerpFlat(s,0,a,l-o,a,l,c);return s}}class js extends bn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Yp(this.times,this.values,this.getValueSize(),e)}}js.prototype.ValueTypeName="quaternion";js.prototype.InterpolantFactoryMethodSmooth=void 0;class fs extends bn{constructor(e,t,n){super(e,t,n)}}fs.prototype.ValueTypeName="string";fs.prototype.ValueBufferType=Array;fs.prototype.DefaultInterpolation=Vs;fs.prototype.InterpolantFactoryMethodLinear=void 0;fs.prototype.InterpolantFactoryMethodSmooth=void 0;class ia extends bn{constructor(e,t,n,i){super(e,t,n,i)}}ia.prototype.ValueTypeName="vector";class sa{constructor(e="",t=-1,n=[],i=wc){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Sn(),this.userData={},this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(jp(n[a]).scale(i));const s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s.userData=JSON.parse(e.userData||"{}"),s}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode,userData:JSON.stringify(e.userData)};for(let s=0,a=n.length;s!==a;++s)t.push(bn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const s=t.length,a=[];for(let o=0;o<s;o++){let c=[],l=[];c.push((o+s-1)%s,o,(o+1)%s),l.push(0,1,0);const h=Hp(c);c=th(c,1,h),l=th(l,1,h),!i&&c[0]===0&&(c.push(s),l.push(l[0])),a.push(new Zs(".morphTargetInfluences["+t[o].name+"]",c,l).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,c=e.length;o<c;o++){const l=e[o],h=l.name.match(s);if(h&&h.length>1){const d=h[1];let u=i[d];u||(i[d]=u=[]),u.push(l)}}const a=[];for(const o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const s=this.tracks[n];t=Math.max(t,s.times[s.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let n=0;n<this.tracks.length;n++)e.push(this.tracks[n].clone());const t=new this.constructor(this.name,this.duration,e,this.blendMode);return t.userData=JSON.parse(JSON.stringify(this.userData)),t}toJSON(){return this.constructor.toJSON(this)}}function Zp(r){switch(r.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return Zs;case"vector":case"vector2":case"vector3":case"vector4":return ia;case"color":return Wd;case"quaternion":return js;case"bool":case"boolean":return us;case"string":return fs}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+r)}function jp(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Zp(r.type);if(r.times===void 0){const n=[],i=[];Vp(r.keys,n,i,"value"),r.times=n,r.values=i}let t;return e.parse!==void 0?t=e.parse(r):t=new e(r.name,r.times,r.values,r.interpolation),Vr(r.settings)&&(t.settings={inTangents:fi(r.settings.inTangents,Float32Array),outTangents:fi(r.settings.outTangents,Float32Array)}),t}const Jn={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(ih(r)||(this.files[r]=e))},get:function(r){if(this.enabled!==!1&&!ih(r))return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}};function ih(r){try{const e=r.slice(r.indexOf(":")+1);return new URL(e).protocol==="blob:"}catch{return!1}}class Jp{constructor(e,t,n){const i=this;let s=!1,a=0,o=0,c;const l=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this._abortController=null,this.itemStart=function(h){o++,s===!1&&i.onStart!==void 0&&i.onStart(h,a,o),s=!0},this.itemEnd=function(h){a++,i.onProgress!==void 0&&i.onProgress(h,a,o),a===o&&(s=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return h=h.normalize("NFC"),c?c(h):h},this.setURLModifier=function(h){return c=h,this},this.addHandler=function(h,d){return l.push(h,d),this},this.removeHandler=function(h){const d=l.indexOf(h);return d!==-1&&l.splice(d,2),this},this.getHandler=function(h){for(let d=0,u=l.length;d<u;d+=2){const f=l[d],g=l[d+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}}const Qp=new Jp;class ps{constructor(e){this.manager=e!==void 0?e:Qp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}ps.DEFAULT_MATERIAL_NAME="__DEFAULT";const $n={};class em extends Error{constructor(e,t){super(e),this.response=t}}class Xd extends ps{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=Jn.get(`file:${e}`);if(s!==void 0){this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0);return}if($n[e]!==void 0){$n[e].push({onLoad:t,onProgress:n,onError:i});return}$n[e]=[],$n[e].push({onLoad:t,onProgress:n,onError:i});const a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),o=this.mimeType,c=this.responseType;fetch(a).then(l=>{if(l.status===200||l.status===0){if(l.status===0&&we("FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||l.body===void 0||l.body.getReader===void 0)return l;const h=$n[e],d=l.body.getReader(),u=l.headers.get("X-File-Size")||l.headers.get("Content-Length"),f=u?parseInt(u):0,g=f!==0;let y=0;const m=new ReadableStream({start(p){M();function M(){d.read().then(({done:C,value:v})=>{if(C)p.close();else{y+=v.byteLength;const E=new ProgressEvent("progress",{lengthComputable:g,loaded:y,total:f});for(let b=0,A=h.length;b<A;b++){const x=h[b];x.onProgress&&x.onProgress(E)}p.enqueue(v),M()}},C=>{p.error(C)})}}});return new Response(m)}else throw new em(`fetch for "${l.url}" responded with ${l.status}: ${l.statusText}`,l)}).then(l=>{switch(c){case"arraybuffer":return l.arrayBuffer();case"blob":return l.blob();case"document":return l.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return l.json();default:if(o==="")return l.text();{const d=/charset="?([^;"\s]*)"?/i.exec(o),u=d&&d[1]?d[1].toLowerCase():void 0,f=new TextDecoder(u);return l.arrayBuffer().then(g=>f.decode(g))}}}).then(l=>{Jn.add(`file:${e}`,l);const h=$n[e];delete $n[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onLoad&&f.onLoad(l)}}).catch(l=>{const h=$n[e];if(h===void 0)throw this.manager.itemError(e),l;delete $n[e];for(let d=0,u=h.length;d<u;d++){const f=h[d];f.onError&&f.onError(l)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Yi=new WeakMap;class tm extends ps{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Jn.get(`image:${e}`);if(a!==void 0){if(a.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);else{let d=Yi.get(a);d===void 0&&(d=[],Yi.set(a,d)),d.push({onLoad:t,onError:i})}return a}const o=qs("img");function c(){h(),t&&t(this);const d=Yi.get(this)||[];for(let u=0;u<d.length;u++){const f=d[u];f.onLoad&&f.onLoad(this)}Yi.delete(this),s.manager.itemEnd(e)}function l(d){h(),i&&i(d),Jn.remove(`image:${e}`);const u=Yi.get(this)||[];for(let f=0;f<u.length;f++){const g=u[f];g.onError&&g.onError(d)}Yi.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",c,!1),o.removeEventListener("error",l,!1)}return o.addEventListener("load",c,!1),o.addEventListener("error",l,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),Jn.add(`image:${e}`,o),s.manager.itemStart(e),o.src=e,o}}class nm extends ps{constructor(e){super(e)}load(e,t,n,i){const s=new St,a=new tm(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}}class ca extends lt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ce(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}}class im extends ca{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ce(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}toJSON(e){const t=super.toJSON(e);return t.object.groundColor=this.groundColor.getHex(),t}}const qa=new ke,sh=new I,rh=new I;class zc{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Ne(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new ke,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Fc,this._frameExtents=new Ne(1,1),this._viewportCount=1,this._viewports=[new ct(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera;sh.setFromMatrixPosition(e.matrixWorld),t.position.copy(sh),rh.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(rh),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,n,i){qa.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),n.setFromProjectionMatrix(qa,e.coordinateSystem,e.reversedDepth);const s=this._frameExtents,a=i?i.z/s.x:1,o=i?i.w/s.y:1,c=i?i.x/s.x:0,l=i?i.y/s.y:0;e.coordinateSystem===Xs||e.reversedDepth?t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+c,0,.5*o,0,.5*o+l,0,0,.5,.5,0,0,0,1),t.multiply(qa)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}const Pr=new I,Ir=new hn,Rn=new I;class qd extends lt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ke,this.projectionMatrix=new ke,this.projectionMatrixInverse=new ke,this.coordinateSystem=Fn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Pr,Ir,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pr,Ir,Rn.set(1,1,1)).invert()}updateWorldMatrix(e,t,n=!1){super.updateWorldMatrix(e,t,n),this.matrixWorld.decompose(Pr,Ir,Rn),Rn.x===1&&Rn.y===1&&Rn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Pr,Ir,Rn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}}const di=new I,ah=new Ne,oh=new Ne;class qt extends qd{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=ls*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(Us*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return ls*2*Math.atan(Math.tan(Us*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){di.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(di.x,di.y).multiplyScalar(-e/di.z),di.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(di.x,di.y).multiplyScalar(-e/di.z)}getViewSize(e,t){return this.getViewBounds(e,ah,oh),t.subVectors(oh,ah)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(Us*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;s+=a.offsetX*i/c,t-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}class sm extends zc{constructor(){super(new qt(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=ls*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,s=e.distance||t.far;(n!==t.fov||i!==t.aspect||s!==t.far)&&(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this.aspect=e.aspect,this}toJSON(){const e=super.toJSON();return e.focus=this.focus,e.aspect=this.aspect,e}}class rm extends ca{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new sm}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.map=e.map,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.angle=this.angle,t.object.decay=this.decay,t.object.penumbra=this.penumbra,t.object.target=this.target.uuid,this.map&&this.map.isTexture&&(t.object.map=this.map.toJSON(e).uuid),t.object.shadow=this.shadow.toJSON(),t}}class am extends zc{constructor(){super(new qt(90,1,.5,500)),this.isPointLightShadow=!0}}class om extends ca{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new am}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){super.dispose(),this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.distance=this.distance,t.object.decay=this.decay,t.object.shadow=this.shadow.toJSON(),t}}class la extends qd{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let s=n-e,a=n+e,o=i+t,c=i-t;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=l*this.view.offsetX,a=s+l*this.view.width,o-=h*this.view.offsetY,c=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,c,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class cm extends zc{constructor(){super(new la(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Kd extends ca{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(lt.DEFAULT_UP),this.updateMatrix(),this.target=new lt,this.shadow=new cm}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){const t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}}class Bs{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const Ka=new WeakMap;class lm extends ps{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&we("ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&we("ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const s=this,a=Jn.get(`image-bitmap:${e}`);if(a!==void 0){if(s.manager.itemStart(e),a.then){a.then(l=>{Ka.has(a)===!0?(i&&i(Ka.get(a)),s.manager.itemError(e),s.manager.itemEnd(e)):(t&&t(l),s.manager.itemEnd(e))});return}setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0);return}const o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader,o.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const c=fetch(e,o).then(function(l){return l.blob()}).then(function(l){return createImageBitmap(l,Object.assign({},s.options,{colorSpaceConversion:"none"}))}).then(function(l){return Jn.add(`image-bitmap:${e}`,l),t&&t(l),s.manager.itemEnd(e),l}).catch(function(l){i&&i(l),Ka.set(c,l),Jn.remove(`image-bitmap:${e}`),s.manager.itemError(e),s.manager.itemEnd(e)});Jn.add(`image-bitmap:${e}`,c),s.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Zi=-90,ji=1;class hm extends lt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new qt(Zi,ji,e,t);i.layers=this.layers,this.add(i);const s=new qt(Zi,ji,e,t);s.layers=this.layers,this.add(s);const a=new qt(Zi,ji,e,t);a.layers=this.layers,this.add(a);const o=new qt(Zi,ji,e,t);o.layers=this.layers,this.add(o);const c=new qt(Zi,ji,e,t);c.layers=this.layers,this.add(c);const l=new qt(Zi,ji,e,t);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,c]=t;for(const l of t)this.remove(l);if(e===Fn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(e===Xs)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const l of t)this.add(l),l.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[s,a,o,c,l,h]=this.children,d=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;const y=n.texture.generateMipmaps;n.texture.generateMipmaps=!1;let m=!1;e.isWebGLRenderer===!0?m=e.state.buffers.depth.getReversed():m=e.reversedDepthBuffer,e.setRenderTarget(n,0,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,s),e.setRenderTarget(n,1,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(n,2,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(n,3,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),e.setRenderTarget(n,4,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),n.texture.generateMipmaps=y,e.setRenderTarget(n,5,i),m&&e.autoClear===!1&&e.clearDepth(),e.render(t,h),e.setRenderTarget(d,u,f),e.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class dm extends qt{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class um{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,s,a;switch(t){case"quaternion":i=this._slerp,s=this._slerpAdditive,a=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,s=this._select,a=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,s=this._lerpAdditive,a=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=s,this._setIdentity=a,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,s=e*i+i;let a=this.cumulativeWeight;if(a===0){for(let o=0;o!==i;++o)n[s+o]=n[o];a=t}else{a+=t;const o=t/a;this._mixBufferRegion(n,s,0,o,i)}this.cumulativeWeight=a}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,s=this.cumulativeWeight,a=this.cumulativeWeightAdditive,o=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,s<1){const c=t*this._origIndex;this._mixBufferRegion(n,i,c,1-s,t)}a>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let c=t,l=t+t;c!==l;++c)if(n[c]!==n[c+t]){o.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let s=n,a=i;s!==a;++s)t[s]=t[i+s%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,s){if(i>=.5)for(let a=0;a!==s;++a)e[t+a]=e[n+a]}_slerp(e,t,n,i){hn.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,s){const a=this._workIndex*s;hn.multiplyQuaternionsFlat(e,a,e,t,e,n),hn.slerpFlat(e,t,e,t,e,a,i)}_lerp(e,t,n,i,s){const a=1-i;for(let o=0;o!==s;++o){const c=t+o;e[c]=e[c]*a+e[n+o]*i}}_lerpAdditive(e,t,n,i,s){for(let a=0;a!==s;++a){const o=t+a;e[o]=e[o]+e[n+a]*i}}}const Gc="\\[\\]\\.:\\/",fm=new RegExp("["+Gc+"]","g"),Hc="[^"+Gc+"]",pm="[^"+Gc.replace("\\.","")+"]",mm=/((?:WC+[\/:])*)/.source.replace("WC",Hc),gm=/(WCOD+)?/.source.replace("WCOD",pm),_m=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Hc),xm=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Hc),vm=new RegExp("^"+mm+gm+_m+xm+"$"),Sm=["material","materials","bones","map"];class ym{constructor(e,t,n){const i=n||nt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,s=n.length;i!==s;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class nt{constructor(e,t,n){this.path=t,this.parsedPath=n||nt.parseTrackName(t),this.node=nt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new nt.Composite(e,t,n):new nt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(fm,"")}static parseTrackName(e){const t=vm.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const s=n.nodeName.substring(i+1);Sm.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(s){for(let a=0;a<s.length;a++){const o=s[a];if(o.name===t||o.uuid===t)return o;const c=n(o.children);if(c)return c}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let s=t.propertyIndex;if(e||(e=nt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){we("PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let l=t.objectIndex;switch(n){case"materials":if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Fe("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Fe("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===l){l=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Fe("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Fe("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){Fe("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(l!==void 0){if(e[l]===void 0){Fe("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[l]}}const a=e[i];if(a===void 0){const l=t.nodeName;Fe("PropertyBinding: Trying to update property for track: "+l+"."+i+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let c=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Fe("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}c=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(c=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(c=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[c],this.setValue=this.SetterByBindingTypeAndVersioning[c][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}nt.Composite=ym;nt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};nt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};nt.prototype.GetterByBindingType=[nt.prototype._getValue_direct,nt.prototype._getValue_array,nt.prototype._getValue_arrayElement,nt.prototype._getValue_toArray];nt.prototype.SetterByBindingTypeAndVersioning=[[nt.prototype._setValue_direct,nt.prototype._setValue_direct_setNeedsUpdate,nt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_array,nt.prototype._setValue_array_setNeedsUpdate,nt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_arrayElement,nt.prototype._setValue_arrayElement_setNeedsUpdate,nt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[nt.prototype._setValue_fromArray,nt.prototype._setValue_fromArray_setNeedsUpdate,nt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Mm{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const s=t.tracks,a=s.length,o=new Array(a),c={endingStart:ts,endingEnd:ts};for(let l=0;l!==a;++l){const h=s[l].createInterpolant(null);o[l]=h,h.settings=c}this._interpolantSettings=c,this._interpolants=o,this._propertyBindings=new Array(a),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._restoreTimeScale=null,this._weightInterpolant=null,this.loop=wd,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,s=e._clip.duration,a=s/i,o=i/s;e._restoreTimeScale=e.timeScale,this._restoreTimeScale=this.timeScale,e.warp(1,a,t),this.warp(o,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,s=i.time,a=this.timeScale;let o=this._timeScaleInterpolant;o===null&&(o=i._lendControlInterpolant(),this._timeScaleInterpolant=o);const c=o.parameterPositions,l=o.sampleValues;return c[0]=s,c[1]=s+n,l[0]=e/a,l[1]=t/a,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this._restoreTimeScale=null,this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const s=this._startTime;if(s!==null){const c=(e-s)*n;c<0||n===0?t=0:(this._startTime=null,t=n*c)}t*=this._updateTimeScale(e);const a=this._updateTime(t),o=this._updateWeight(e);if(o>0){const c=this._interpolants,l=this._propertyBindings;switch(this.blendMode){case Af:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulateAdditive(o);break;case wc:default:for(let h=0,d=c.length;h!==d;++h)c[h].evaluate(a),l[h].accumulate(i,o)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(t===0?this.paused=!0:(this._restoreTimeScale!==null&&(t=this._restoreTimeScale),this.timeScale=t),this.stopWarping())}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,s=this._loopCount;const a=n===wf;if(e===0)return s===-1?i:a&&(s&1)===1?t-i:i;if(n===Td){s===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(s===-1&&(e>=0?(s=0,this._setEndings(!0,this.repetitions===0,a)):this._setEndings(this.repetitions===0,!0,a)),i>=t||i<0){const o=Math.floor(i/t);i-=t*o,s+=Math.abs(o);const c=this.repetitions-s;if(c<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(c===1){const l=e<0;this._setEndings(l,!l,a)}else this._setEndings(!1,!1,a);this._loopCount=s,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:o})}}else this._loopCount=s,this.time=i;if(a&&(s&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=ns,i.endingEnd=ns):(e?i.endingStart=this.zeroSlopeAtStart?ns:ts:i.endingStart=Zr,t?i.endingEnd=this.zeroSlopeAtEnd?ns:ts:i.endingEnd=Zr)}_scheduleFading(e,t,n){const i=this._mixer,s=i.time;let a=this._weightInterpolant;a===null&&(a=i._lendControlInterpolant(),this._weightInterpolant=a);const o=a.parameterPositions,c=a.sampleValues;return o[0]=s,c[0]=t,o[1]=s+e,c[1]=n,this}}const Em=new Float32Array(1);class bm extends vi{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,s=i.length,a=e._propertyBindings,o=e._interpolants,c=n.uuid,l=this._bindingsByRootAndName;let h=l[c];h===void 0&&(h={},l[c]=h);for(let d=0;d!==s;++d){const u=i[d],f=u.name;let g=h[f];if(g!==void 0)++g.referenceCount,a[d]=g;else{if(g=a[d],g!==void 0){g._cacheIndex===null&&(++g.referenceCount,this._addInactiveBinding(g,c,f));continue}const y=t&&t._propertyBindings[d].binding.parsedPath;g=new um(nt.create(n,f,y),u.ValueTypeName,u.getValueSize()),++g.referenceCount,this._addInactiveBinding(g,c,f),a[d]=g}o[d].resultBuffer=g.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,s=this._actionsByClip[i];this._bindAction(e,s&&s.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];s.useCount++===0&&(this._lendBinding(s),s.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.useCount===0&&(s.restoreOriginalState(),this._takeBackBinding(s))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,s=this._actionsByClip;let a=s[t];if(a===void 0)a={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,s[t]=a;else{const o=a.knownActions;e._byClipCacheIndex=o.length,o.push(e)}e._cacheIndex=i.length,i.push(e),a.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const s=e._clip.uuid,a=this._actionsByClip,o=a[s],c=o.knownActions,l=c[c.length-1],h=e._byClipCacheIndex;l._byClipCacheIndex=h,c[h]=l,c.pop(),e._byClipCacheIndex=null;const d=o.actionByRoot,u=(e._localRoot||this._root).uuid;delete d[u],c.length===0&&delete a[s],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const s=t[n];--s.referenceCount===0&&this._removeInactiveBinding(s)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,s=this._bindings;let a=i[t];a===void 0&&(a={},i[t]=a),a[n]=e,e._cacheIndex=s.length,s.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,s=n.path,a=this._bindingsByRootAndName,o=a[i],c=t[t.length-1],l=e._cacheIndex;c._cacheIndex=l,t[l]=c,t.pop(),delete o[s],Object.keys(o).length===0&&delete a[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,s=t[i];e._cacheIndex=i,t[i]=e,s._cacheIndex=n,t[n]=s}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Hd(new Float32Array(2),new Float32Array(2),1,Em),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,s=t[i];e.__cacheIndex=i,t[i]=e,s.__cacheIndex=n,t[n]=s}clipAction(e,t,n){const i=t||this._root,s=i.uuid;let a=typeof e=="string"?sa.findByName(i,e):e;const o=a!==null?a.uuid:e,c=this._actionsByClip[o];let l=null;if(n===void 0&&(a!==null?n=a.blendMode:n=wc),c!==void 0){const d=c.actionByRoot[s];if(d!==void 0&&d.blendMode===n)return d;l=c.knownActions[0],a===null&&(a=l._clip)}if(a===null)return null;const h=new Mm(this,a,t,n);return this._bindAction(h,l),this._addInactiveAction(h,o,s),h}existingAction(e,t){const n=t||this._root,i=n.uuid,s=typeof e=="string"?sa.findByName(n,e):e,a=s?s.uuid:e,o=this._actionsByClip[a];return o!==void 0&&o.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,s=Math.sign(e),a=this._accuIndex^=1;for(let l=0;l!==n;++l)t[l]._update(i,e,s,a);const o=this._bindings,c=this._nActiveBindings;for(let l=0;l!==c;++l)o[l].apply(a);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,s=i[n];if(s!==void 0){const a=s.knownActions;for(let o=0,c=a.length;o!==c;++o){const l=a[o];this._deactivateAction(l);const h=l._cacheIndex,d=t[t.length-1];l._cacheIndex=null,l._byClipCacheIndex=null,d._cacheIndex=h,t[h]=d,t.pop(),this._removeInactiveBindingsForAction(l)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const a in n){const o=n[a].actionByRoot,c=o[t];c!==void 0&&(this._deactivateAction(c),this._removeInactiveAction(c))}const i=this._bindingsByRootAndName,s=i[t];if(s!==void 0)for(const a in s){const o=s[a];o.restoreOriginalState(),this._removeInactiveBinding(o)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}const ch=new ke;class Tm{constructor(e,t,n=0,i=1/0){this.ray=new Qs(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new Ic,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,t.projectionMatrix.elements[14]).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):Fe("Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return ch.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(ch),this}intersectObject(e,t=!0,n=[]){return ic(e,this,n,t),n.sort(lh),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)ic(e[i],this,n,t);return n.sort(lh),n}}function lh(r,e){return r.distance-e.distance}function ic(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){const s=r.children;for(let a=0,o=s.length;a<o;a++)ic(s[a],e,t,!0)}}const tl=class tl{constructor(e,t,n,i){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,n,i)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let n=0;n<4;n++)this.elements[n]=e[n+t];return this}set(e,t,n,i){const s=this.elements;return s[0]=e,s[2]=t,s[1]=n,s[3]=i,this}};tl.prototype.isMatrix2=!0;let hh=tl;function dh(r,e,t,n){const i=wm(n);switch(t){case Ed:return r*e;case Mc:return r*e/i.components*i.byteLength;case Ec:return r*e/i.components*i.byteLength;case Ii:return r*e*2/i.components*i.byteLength;case bc:return r*e*2/i.components*i.byteLength;case bd:return r*e*3/i.components*i.byteLength;case cn:return r*e*4/i.components*i.byteLength;case Tc:return r*e*4/i.components*i.byteLength;case kr:case zr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Gr:case Hr:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case bo:case wo:return Math.max(r,16)*Math.max(e,8)/4;case Eo:case To:return Math.max(r,8)*Math.max(e,8)/2;case Ao:case Ro:case Po:case Io:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Co:case $r:case Lo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Do:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case No:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Uo:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case ko:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case zo:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Go:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case Ho:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case Vo:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Wo:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Xo:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case qo:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case Ko:case $o:case Yo:return Math.ceil(r/4)*Math.ceil(e/4)*16;case Zo:case jo:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Yr:case Jo:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function wm(r){switch(r){case Qt:case vd:return{byteLength:1,components:1};case Gs:case Sd:case Bn:return{byteLength:2,components:1};case Sc:case yc:return{byteLength:2,components:4};case On:case vc:case on:return{byteLength:4,components:1};case yd:case Md:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${r}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}}));typeof window<"u"&&(window.__THREE__?we("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc);/**
 * @license
 * Copyright 2010-2026 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function $d(){let r=null,e=!1,t=null,n=null;function i(s,a){n=r.requestAnimationFrame(i),t(s,a)}return{start:function(){e!==!0&&t!==null&&r!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r!==null&&r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function Am(r){const e=new WeakMap;function t(o,c){const l=o.array,h=o.usage,d=l.byteLength,u=r.createBuffer();r.bindBuffer(c,u),r.bufferData(c,l,h),o.onUploadCallback();let f;if(l instanceof Float32Array)f=r.FLOAT;else if(typeof Float16Array<"u"&&l instanceof Float16Array)f=r.HALF_FLOAT;else if(l instanceof Uint16Array)o.isFloat16BufferAttribute?f=r.HALF_FLOAT:f=r.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=r.SHORT;else if(l instanceof Uint32Array)f=r.UNSIGNED_INT;else if(l instanceof Int32Array)f=r.INT;else if(l instanceof Int8Array)f=r.BYTE;else if(l instanceof Uint8Array)f=r.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=r.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:u,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:o.version,size:d}}function n(o,c,l){const h=c.array,d=c.updateRanges;if(r.bindBuffer(l,o),d.length===0)r.bufferSubData(l,0,h);else{d.sort((f,g)=>f.start-g.start);let u=0;for(let f=1;f<d.length;f++){const g=d[u],y=d[f];y.start<=g.start+g.count+1?g.count=Math.max(g.count,y.start+y.count-g.start):(++u,d[u]=y)}d.length=u+1;for(let f=0,g=d.length;f<g;f++){const y=d[f];r.bufferSubData(l,y.start*h.BYTES_PER_ELEMENT,h,y.start,y.count)}c.clearUpdateRanges()}c.onUploadCallback()}function i(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function s(o){o.isInterleavedBufferAttribute&&(o=o.data);const c=e.get(o);c&&(r.deleteBuffer(c.buffer),e.delete(o))}function a(o,c){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){const h=e.get(o);(!h||h.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}const l=e.get(o);if(l===void 0)e.set(o,t(o,c));else if(l.version<o.version){if(l.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,o,c),l.version=o.version}}return{get:i,remove:s,update:a}}var Rm=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Cm=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Pm=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Im=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Lm=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Dm=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Nm=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,Fm=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Um=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,Om=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Bm=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,km=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,zm=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,Gm=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,Hm=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,Vm=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Wm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Xm=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,qm=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Km=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,$m=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,Ym=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Zm=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,jm=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Jm=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Qm=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,eg=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,tg=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,ng=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,ig=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,sg="gl_FragColor = linearToOutputTexel( gl_FragColor );",rg=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,ag=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,og=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,cg=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,lg=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,hg=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,dg=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,ug=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fg=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,pg=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,mg=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,gg=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,_g=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,xg=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,vg=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,Sg=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,yg=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Mg=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Eg=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,bg=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,Tg=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,wg=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,Ag=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,Rg=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Cg=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Pg=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,Ig=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Lg=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Dg=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Ng=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Fg=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,Ug=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,Og=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,Bg=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,kg=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,zg=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Gg=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Hg=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Vg=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Wg=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,Xg=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,qg=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Kg=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,$g=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Yg=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Zg=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,jg=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Jg=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Qg=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,e_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,t_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,n_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,i_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,s_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,r_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,a_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,o_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,c_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,l_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,h_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,d_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,u_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,f_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,p_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,m_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,g_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,__=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,x_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,v_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,S_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,y_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,M_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,E_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,b_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,T_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,w_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,A_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const R_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,C_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,P_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,I_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,L_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,D_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,N_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,F_=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,U_=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,O_=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,B_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,k_=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,z_=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,G_=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,H_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,V_=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,W_=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,X_=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,q_=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,K_=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,$_=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Y_=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Z_=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,j_=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,J_=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Q_=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,e0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,t0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,n0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,i0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,s0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,r0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,a0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,o0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ge={alphahash_fragment:Rm,alphahash_pars_fragment:Cm,alphamap_fragment:Pm,alphamap_pars_fragment:Im,alphatest_fragment:Lm,alphatest_pars_fragment:Dm,aomap_fragment:Nm,aomap_pars_fragment:Fm,batching_pars_vertex:Um,batching_vertex:Om,begin_vertex:Bm,beginnormal_vertex:km,bsdfs:zm,iridescence_fragment:Gm,bumpmap_pars_fragment:Hm,clipping_planes_fragment:Vm,clipping_planes_pars_fragment:Wm,clipping_planes_pars_vertex:Xm,clipping_planes_vertex:qm,color_fragment:Km,color_pars_fragment:$m,color_pars_vertex:Ym,color_vertex:Zm,common:jm,cube_uv_reflection_fragment:Jm,defaultnormal_vertex:Qm,displacementmap_pars_vertex:eg,displacementmap_vertex:tg,emissivemap_fragment:ng,emissivemap_pars_fragment:ig,colorspace_fragment:sg,colorspace_pars_fragment:rg,envmap_fragment:ag,envmap_common_pars_fragment:og,envmap_pars_fragment:cg,envmap_pars_vertex:lg,envmap_physical_pars_fragment:Sg,envmap_vertex:hg,fog_vertex:dg,fog_pars_vertex:ug,fog_fragment:fg,fog_pars_fragment:pg,gradientmap_pars_fragment:mg,lightmap_pars_fragment:gg,lights_lambert_fragment:_g,lights_lambert_pars_fragment:xg,lights_pars_begin:vg,lights_toon_fragment:yg,lights_toon_pars_fragment:Mg,lights_phong_fragment:Eg,lights_phong_pars_fragment:bg,lights_physical_fragment:Tg,lights_physical_pars_fragment:wg,lights_fragment_begin:Ag,lights_fragment_maps:Rg,lights_fragment_end:Cg,lightprobes_pars_fragment:Pg,logdepthbuf_fragment:Ig,logdepthbuf_pars_fragment:Lg,logdepthbuf_pars_vertex:Dg,logdepthbuf_vertex:Ng,map_fragment:Fg,map_pars_fragment:Ug,map_particle_fragment:Og,map_particle_pars_fragment:Bg,metalnessmap_fragment:kg,metalnessmap_pars_fragment:zg,morphinstance_vertex:Gg,morphcolor_vertex:Hg,morphnormal_vertex:Vg,morphtarget_pars_vertex:Wg,morphtarget_vertex:Xg,normal_fragment_begin:qg,normal_fragment_maps:Kg,normal_pars_fragment:$g,normal_pars_vertex:Yg,normal_vertex:Zg,normalmap_pars_fragment:jg,clearcoat_normal_fragment_begin:Jg,clearcoat_normal_fragment_maps:Qg,clearcoat_pars_fragment:e_,iridescence_pars_fragment:t_,opaque_fragment:n_,packing:i_,premultiplied_alpha_fragment:s_,project_vertex:r_,dithering_fragment:a_,dithering_pars_fragment:o_,roughnessmap_fragment:c_,roughnessmap_pars_fragment:l_,shadowmap_pars_fragment:h_,shadowmap_pars_vertex:d_,shadowmap_vertex:u_,shadowmask_pars_fragment:f_,skinbase_vertex:p_,skinning_pars_vertex:m_,skinning_vertex:g_,skinnormal_vertex:__,specularmap_fragment:x_,specularmap_pars_fragment:v_,tonemapping_fragment:S_,tonemapping_pars_fragment:y_,transmission_fragment:M_,transmission_pars_fragment:E_,uv_pars_fragment:b_,uv_pars_vertex:T_,uv_vertex:w_,worldpos_vertex:A_,background_vert:R_,background_frag:C_,backgroundCube_vert:P_,backgroundCube_frag:I_,cube_vert:L_,cube_frag:D_,depth_vert:N_,depth_frag:F_,distance_vert:U_,distance_frag:O_,equirect_vert:B_,equirect_frag:k_,linedashed_vert:z_,linedashed_frag:G_,meshbasic_vert:H_,meshbasic_frag:V_,meshlambert_vert:W_,meshlambert_frag:X_,meshmatcap_vert:q_,meshmatcap_frag:K_,meshnormal_vert:$_,meshnormal_frag:Y_,meshphong_vert:Z_,meshphong_frag:j_,meshphysical_vert:J_,meshphysical_frag:Q_,meshtoon_vert:e0,meshtoon_frag:t0,points_vert:n0,points_frag:i0,shadow_vert:s0,shadow_frag:r0,sprite_vert:a0,sprite_frag:o0},de={common:{diffuse:{value:new Ce(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Oe}},envmap:{envMap:{value:null},envMapRotation:{value:new Oe},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Oe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Oe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Oe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Oe},normalScale:{value:new Ne(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Oe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Oe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Oe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Oe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ce(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new I},probesMax:{value:new I},probesResolution:{value:new I}},points:{diffuse:{value:new Ce(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0},uvTransform:{value:new Oe}},sprite:{diffuse:{value:new Ce(16777215)},opacity:{value:1},center:{value:new Ne(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Oe},alphaMap:{value:null},alphaMapTransform:{value:new Oe},alphaTest:{value:0}}},Ln={basic:{uniforms:Xt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:Xt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ce(0)},envMapIntensity:{value:1}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:Xt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new Ce(0)},specular:{value:new Ce(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:Xt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new Ce(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:Xt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new Ce(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:Xt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:Xt([de.points,de.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:Xt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:Xt([de.common,de.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:Xt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:Xt([de.sprite,de.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Oe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Oe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distance:{uniforms:Xt([de.common,de.displacementmap,{referencePosition:{value:new I},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distance_vert,fragmentShader:Ge.distance_frag},shadow:{uniforms:Xt([de.lights,de.fog,{color:{value:new Ce(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Ln.physical={uniforms:Xt([Ln.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Oe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Oe},clearcoatNormalScale:{value:new Ne(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Oe},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Oe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Oe},sheen:{value:0},sheenColor:{value:new Ce(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Oe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Oe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Oe},transmissionSamplerSize:{value:new Ne},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Oe},attenuationDistance:{value:0},attenuationColor:{value:new Ce(0)},specularColor:{value:new Ce(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Oe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Oe},anisotropyVector:{value:new Ne},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Oe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};const Lr={r:0,b:0,g:0},c0=new ke,Yd=new Oe;Yd.set(-1,0,0,0,1,0,0,0,1);function l0(r,e,t,n,i,s){const a=new Ce(0);let o=i===!0?0:1,c,l,h=null,d=0,u=null;function f(M){let C=M.isScene===!0?M.background:null;if(C&&C.isTexture){const v=M.backgroundBlurriness>0;C=e.get(C,v)}return C}function g(M){let C=!1;const v=f(M);v===null?m(a,o):v&&v.isColor&&(m(v,1),C=!0);const E=r.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,s):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,s),(r.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))}function y(M,C){const v=f(C);v&&(v.isCubeTexture||v.mapping===aa)?(l===void 0&&(l=new Pe(new st(1,1,1),new kn({name:"BackgroundCubeMaterial",uniforms:hs(Ln.backgroundCube.uniforms),vertexShader:Ln.backgroundCube.vertexShader,fragmentShader:Ln.backgroundCube.fragmentShader,side:$t,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),l.geometry.deleteAttribute("uv"),l.onBeforeRender=function(E,b,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(l.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),n.update(l)),l.material.uniforms.envMap.value=v,l.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.uniforms.backgroundRotation.value.setFromMatrix4(c0.makeRotationFromEuler(C.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&l.material.uniforms.backgroundRotation.value.premultiply(Yd),l.material.toneMapped=qe.getTransfer(v.colorSpace)!==rt,(h!==v||d!==v.version||u!==r.toneMapping)&&(l.material.needsUpdate=!0,h=v,d=v.version,u=r.toneMapping),l.layers.enableAll(),M.unshift(l,l.geometry,l.material,0,0,null)):v&&v.isTexture&&(c===void 0&&(c=new Pe(new En(2,2),new kn({name:"BackgroundMaterial",uniforms:hs(Ln.background.uniforms),vertexShader:Ln.background.vertexShader,fragmentShader:Ln.background.fragmentShader,side:_i,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),n.update(c)),c.material.uniforms.t2D.value=v,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.toneMapped=qe.getTransfer(v.colorSpace)!==rt,v.matrixAutoUpdate===!0&&v.updateMatrix(),c.material.uniforms.uvTransform.value.copy(v.matrix),(h!==v||d!==v.version||u!==r.toneMapping)&&(c.material.needsUpdate=!0,h=v,d=v.version,u=r.toneMapping),c.layers.enableAll(),M.unshift(c,c.geometry,c.material,0,0,null))}function m(M,C){M.getRGB(Lr,Gd(r)),t.buffers.color.setClear(Lr.r,Lr.g,Lr.b,C,s)}function p(){l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(M,C=1){a.set(M),o=C,m(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(M){o=M,m(a,o)},render:g,addToRenderList:y,dispose:p}}function h0(r,e){const t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=u(null);let s=i,a=!1;function o(D,O,H,U,G){let Z=!1;const X=d(D,U,H,O);s!==X&&(s=X,l(s.object)),Z=f(D,U,H,G),Z&&g(D,U,H,G),G!==null&&e.update(G,r.ELEMENT_ARRAY_BUFFER),(Z||a)&&(a=!1,v(D,O,H,U),G!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function c(){return r.createVertexArray()}function l(D){return r.bindVertexArray(D)}function h(D){return r.deleteVertexArray(D)}function d(D,O,H,U){const G=U.wireframe===!0;let Z=n[O.id];Z===void 0&&(Z={},n[O.id]=Z);const X=D.isInstancedMesh===!0?D.id:0;let ie=Z[X];ie===void 0&&(ie={},Z[X]=ie);let K=ie[H.id];K===void 0&&(K={},ie[H.id]=K);let ee=K[G];return ee===void 0&&(ee=u(c()),K[G]=ee),ee}function u(D){const O=[],H=[],U=[];for(let G=0;G<t;G++)O[G]=0,H[G]=0,U[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:O,enabledAttributes:H,attributeDivisors:U,object:D,attributes:{},index:null}}function f(D,O,H,U){const G=s.attributes,Z=O.attributes;let X=0;const ie=H.getAttributes();for(const K in ie)if(ie[K].location>=0){const ne=G[K];let Le=Z[K];if(Le===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(Le=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(Le=D.instanceColor)),ne===void 0||ne.attribute!==Le||Le&&ne.data!==Le.data)return!0;X++}return s.attributesNum!==X||s.index!==U}function g(D,O,H,U){const G={},Z=O.attributes;let X=0;const ie=H.getAttributes();for(const K in ie)if(ie[K].location>=0){let ne=Z[K];ne===void 0&&(K==="instanceMatrix"&&D.instanceMatrix&&(ne=D.instanceMatrix),K==="instanceColor"&&D.instanceColor&&(ne=D.instanceColor));const Le={};Le.attribute=ne,ne&&ne.data&&(Le.data=ne.data),G[K]=Le,X++}s.attributes=G,s.attributesNum=X,s.index=U}function y(){const D=s.newAttributes;for(let O=0,H=D.length;O<H;O++)D[O]=0}function m(D){p(D,0)}function p(D,O){const H=s.newAttributes,U=s.enabledAttributes,G=s.attributeDivisors;H[D]=1,U[D]===0&&(r.enableVertexAttribArray(D),U[D]=1),G[D]!==O&&(r.vertexAttribDivisor(D,O),G[D]=O)}function M(){const D=s.newAttributes,O=s.enabledAttributes;for(let H=0,U=O.length;H<U;H++)O[H]!==D[H]&&(r.disableVertexAttribArray(H),O[H]=0)}function C(D,O,H,U,G,Z,X){X===!0?r.vertexAttribIPointer(D,O,H,G,Z):r.vertexAttribPointer(D,O,H,U,G,Z)}function v(D,O,H,U){y();const G=U.attributes,Z=H.getAttributes(),X=O.defaultAttributeValues;for(const ie in Z){const K=Z[ie];if(K.location>=0){let ee=G[ie];if(ee===void 0&&(ie==="instanceMatrix"&&D.instanceMatrix&&(ee=D.instanceMatrix),ie==="instanceColor"&&D.instanceColor&&(ee=D.instanceColor)),ee!==void 0){const ne=ee.normalized,Le=ee.itemSize,Ae=e.get(ee);if(Ae===void 0)continue;const dt=Ae.buffer,Ye=Ae.type,Je=Ae.bytesPerElement,$=Ye===r.INT||Ye===r.UNSIGNED_INT||ee.gpuType===vc;if(ee.isInterleavedBufferAttribute){const Q=ee.data,xe=Q.stride,Ue=ee.offset;if(Q.isInstancedInterleavedBuffer){for(let ge=0;ge<K.locationSize;ge++)p(K.location+ge,Q.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ge=0;ge<K.locationSize;ge++)m(K.location+ge);r.bindBuffer(r.ARRAY_BUFFER,dt);for(let ge=0;ge<K.locationSize;ge++)C(K.location+ge,Le/K.locationSize,Ye,ne,xe*Je,(Ue+Le/K.locationSize*ge)*Je,$)}else{if(ee.isInstancedBufferAttribute){for(let Q=0;Q<K.locationSize;Q++)p(K.location+Q,ee.meshPerAttribute);D.isInstancedMesh!==!0&&U._maxInstanceCount===void 0&&(U._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let Q=0;Q<K.locationSize;Q++)m(K.location+Q);r.bindBuffer(r.ARRAY_BUFFER,dt);for(let Q=0;Q<K.locationSize;Q++)C(K.location+Q,Le/K.locationSize,Ye,ne,Le*Je,Le/K.locationSize*Q*Je,$)}}else if(X!==void 0){const ne=X[ie];if(ne!==void 0)switch(ne.length){case 2:r.vertexAttrib2fv(K.location,ne);break;case 3:r.vertexAttrib3fv(K.location,ne);break;case 4:r.vertexAttrib4fv(K.location,ne);break;default:r.vertexAttrib1fv(K.location,ne)}}}}M()}function E(){T();for(const D in n){const O=n[D];for(const H in O){const U=O[H];for(const G in U){const Z=U[G];for(const X in Z)h(Z[X].object),delete Z[X];delete U[G]}}delete n[D]}}function b(D){if(n[D.id]===void 0)return;const O=n[D.id];for(const H in O){const U=O[H];for(const G in U){const Z=U[G];for(const X in Z)h(Z[X].object),delete Z[X];delete U[G]}}delete n[D.id]}function A(D){for(const O in n){const H=n[O];for(const U in H){const G=H[U];if(G[D.id]===void 0)continue;const Z=G[D.id];for(const X in Z)h(Z[X].object),delete Z[X];delete G[D.id]}}}function x(D){for(const O in n){const H=n[O],U=D.isInstancedMesh===!0?D.id:0,G=H[U];if(G!==void 0){for(const Z in G){const X=G[Z];for(const ie in X)h(X[ie].object),delete X[ie];delete G[Z]}delete H[U],Object.keys(H).length===0&&delete n[O]}}}function T(){P(),a=!0,s!==i&&(s=i,l(s.object))}function P(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:A,initAttributes:y,enableAttribute:m,disableUnusedAttributes:M}}function d0(r,e,t){let n;function i(c){n=c}function s(c,l){r.drawArrays(n,c,l),t.update(l,n,1)}function a(c,l,h){h!==0&&(r.drawArraysInstanced(n,c,l,h),t.update(l,n,h))}function o(c,l,h){if(h===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,l,0,h);let u=0;for(let f=0;f<h;f++)u+=l[f];t.update(u,n,1)}this.setMode=i,this.render=s,this.renderInstances=a,this.renderMultiDraw=o}function u0(r,e,t,n){let i;function s(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const A=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function a(A){return!(A!==cn&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(A){const x=A===Bn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Qt&&A!==on&&!x&&n.convert(A)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE))}function c(A){if(A==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=t.precision!==void 0?t.precision:"highp";const h=c(l);h!==l&&(we("WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const d=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&we("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");const f=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),g=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS),y=r.getParameter(r.MAX_TEXTURE_SIZE),m=r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),p=r.getParameter(r.MAX_VERTEX_ATTRIBS),M=r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),C=r.getParameter(r.MAX_VARYING_VECTORS),v=r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),E=r.getParameter(r.MAX_SAMPLES),b=r.getParameter(r.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:c,textureFormatReadable:a,textureTypeReadable:o,precision:l,logarithmicDepthBuffer:d,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:g,maxTextureSize:y,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:M,maxVaryings:C,maxFragmentUniforms:v,maxSamples:E,samples:b}}function f0(r){const e=this;let t=null,n=0,i=!1,s=!1;const a=new Yn,o=new Oe,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(d,u){t=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,y=d.clipIntersection,m=d.clipShadows,p=r.get(d);if(!i||g===null||g.length===0||s&&!m)s?h(null):l();else{const M=s?0:n,C=M*4;let v=p.clippingState||null;c.value=v,v=h(g,u,C,f);for(let E=0;E!==C;++E)v[E]=t[E];p.clippingState=v,this.numIntersection=y?this.numPlanes:0,this.numPlanes+=M}};function l(){c.value!==t&&(c.value=t,c.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function h(d,u,f,g){const y=d!==null?d.length:0;let m=null;if(y!==0){if(m=c.value,g!==!0||m===null){const p=f+y*4,M=u.matrixWorldInverse;o.getNormalMatrix(M),(m===null||m.length<p)&&(m=new Float32Array(p));for(let C=0,v=f;C!==y;++C,v+=4)a.copy(d[C]).applyMatrix4(M,o),a.normal.toArray(m,v),m[v+3]=a.constant}c.value=m,c.needsUpdate=!0}return e.numPlanes=y,e.numIntersection=0,m}}const is=4,p0=6,m0=20,g0=256,Cs=new la,uh=new Ce;let $a=null,Ya=0,Za=0,ja=!1;const _0=new I,Ti=new I;class fh{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,n=.1,i=100,s={}){const{size:a=256,position:o=_0}=s;$a=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);const c=this._allocateTargets();return c.depthBuffer=!0,this._sceneToCubeUV(e,n,i,c,o),t>0&&this._blur(c,0,0,t),this._applyPMREM(c),this._cleanup(c),c}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=gh(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=mh(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget($a,Ya,Za),this._renderer.xr.enabled=ja,e.scissorTest=!1,Ji(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Pi||e.mapping===os?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),$a=this._renderer.getRenderTarget(),Ya=this._renderer.getActiveCubeFace(),Za=this._renderer.getActiveMipmapLevel(),ja=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:Bn,format:cn,colorSpace:tn,depthBuffer:!1},i=ph(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ph(e,t,n);const{_lodMax:s}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=x0(s)),this._blurMaterial=S0(s,e,t),this._ggxMaterial=v0(s,e,t)}return i}_compileMaterial(e){const t=new Pe(new Lt,e);this._renderer.compile(t,Cs)}_sceneToCubeUV(e,t,n,i,s){const c=new qt(90,1,t,n),l=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],d=this._renderer,u=d.autoClear,f=d.toneMapping;d.getClearColor(uh),d.toneMapping=Un,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Pe(new st,new jn({name:"PMREM.Background",side:$t,depthWrite:!1,depthTest:!1})));const y=this._backgroundBox,m=y.material;let p=!1;const M=e.background;M?M.isColor&&(m.color.copy(M),e.background=null,p=!0):(m.color.copy(uh),p=!0);for(let C=0;C<6;C++){const v=C%3;v===0?(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x+h[C],s.y,s.z)):v===1?(c.up.set(0,0,l[C]),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y+h[C],s.z)):(c.up.set(0,l[C],0),c.position.set(s.x,s.y,s.z),c.lookAt(s.x,s.y,s.z+h[C]));const E=this._cubeSize;Ji(i,v*E,C>2?E:0,E,E),d.setRenderTarget(i),p&&d.render(y,c),d.render(e,c)}d.toneMapping=f,d.autoClear=u,e.background=M}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===Pi||e.mapping===os;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=gh()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=mh());const s=i?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=s;const o=s.uniforms;o.envMap.value=e;const c=this._cubeSize;Ji(t,0,0,3*c,2*c),n.setRenderTarget(t),n.render(a,Cs)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodMeshes.length;for(let s=1;s<i;s++)this._applyGGXFilter(e,s-1,s);t.autoClear=n}_applyGGXFilter(e,t,n){const i=this._renderer,s=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[n];o.material=a;const c=a.uniforms,l=n/(this._lodMeshes.length-1),h=t/(this._lodMeshes.length-1),d=Math.sqrt(l*l-h*h),u=l*1.25,f=d*u,{_lodMax:g}=this,y=this._sizeLods[n],m=3*y*(n>g-is?n-g+is:0),p=4*(this._cubeSize-y);c.envMap.value=e.texture,c.roughness.value=f,c.mipInt.value=g-t,Ji(s,m,p,3*y,2*y),i.setRenderTarget(s),i.render(o,Cs),c.envMap.value=s.texture,c.roughness.value=0,c.mipInt.value=g-n,Ji(e,m,p,3*y,2*y),i.setRenderTarget(e),i.render(o,Cs)}_blur(e,t,n,i){const s=this._pingPongRenderTarget,a=Math.min(i,Math.PI)/Math.SQRT2;this._blurPass(e,s,t,n,a),this._blurPass(s,e,n,n,a)}_blurPass(e,t,n,i,s){const a=this._renderer,o=this._blurMaterial,c=this._lodMeshes[i];c.material=o;const l=o.uniforms;l.envMap.value=e.texture,l.sigma.value=s,l.mipInt.value=this._lodMax-n;const h=this._sizeLods[i],d=3*h*(i>this._lodMax-is?i-this._lodMax+is:0),u=4*(this._cubeSize-h);Ji(t,d,u,3*h,2*h),a.setRenderTarget(t),a.render(c,Cs)}}function x0(r){const e=[],t=[];let n=r;const i=r-is+1+p0;for(let s=0;s<i;s++){const a=Math.pow(2,n);e.push(a);const o=1/(a-2),c=-o,l=1+o,h=[c,c,l,c,l,l,c,c,l,l,c,l],d=6,u=6,f=3,g=new Float32Array(f*u*d),y=new Float32Array(f*u*d);for(let p=0;p<d;p++){const M=p%3*2/3-1,C=p>2?0:-1,v=[M,C,0,M+2/3,C,0,M+2/3,C+1,0,M,C,0,M+2/3,C+1,0,M,C+1,0];g.set(v,f*u*p);for(let E=0;E<u;E++){const b=h[E*2]*2-1,A=h[E*2+1]*2-1;p===0?Ti.set(1,A,b):p===1?Ti.set(-b,1,-A):p===2?Ti.set(-b,A,1):p===3?Ti.set(-1,A,-b):p===4?Ti.set(-b,-1,A):Ti.set(b,A,-1),Ti.toArray(y,(p*u+E)*f)}}const m=new Lt;m.setAttribute("position",new Yt(g,f)),m.setAttribute("outputDirection",new Yt(y,f)),t.push(new Pe(m,null)),n>is&&n--}return{lodMeshes:t,sizeLods:e}}function ph(r,e,t){const n=new yn(r,e,t);return n.texture.mapping=aa,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Ji(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function v0(r,e,t){return new kn({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:g0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:ha(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function S0(r,e,t){return new kn({name:"SphericalGaussianBlur",defines:{SAMPLES:m0,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${r}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:ha(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function mh(){return new kn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function gh(){return new kn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ha(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Qn,depthTest:!1,depthWrite:!1})}function ha(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}class Zd extends yn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new kd(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new st(5,5,5),s=new kn({name:"CubemapFromEquirect",uniforms:hs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:$t,blending:Qn});s.uniforms.tEquirect.value=t;const a=new Pe(i,s),o=t.minFilter;return t.minFilter===Zn&&(t.minFilter=Rt),new hm(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}}function y0(r){let e=new WeakMap,t=new WeakMap,n=null;function i(u,f=!1){return u==null?null:f?a(u):s(u)}function s(u){if(u&&u.isTexture){const f=u.mapping;if(f===xa||f===va)if(e.has(u)){const g=e.get(u).texture;return o(g,u.mapping)}else{const g=u.image;if(g&&g.height>0){const y=new Zd(g.height);return y.fromEquirectangularTexture(r,u),e.set(u,y),u.addEventListener("dispose",l),o(y.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){const f=u.mapping,g=f===xa||f===va,y=f===Pi||f===os;if(g||y){let m=t.get(u);const p=m!==void 0?m.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==p)return n===null&&(n=new fh(r)),m=g?n.fromEquirectangular(u,m):n.fromCubemap(u,m),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),m.texture;if(m!==void 0)return m.texture;{const M=u.image;return g&&M&&M.height>0||y&&M&&c(M)?(n===null&&(n=new fh(r)),m=g?n.fromEquirectangular(u):n.fromCubemap(u),m.texture.pmremVersion=u.pmremVersion,t.set(u,m),u.addEventListener("dispose",h),m.texture):null}}}return u}function o(u,f){return f===xa?u.mapping=Pi:f===va&&(u.mapping=os),u}function c(u){let f=0;const g=6;for(let y=0;y<g;y++)u[y]!==void 0&&f++;return f===g}function l(u){const f=u.target;f.removeEventListener("dispose",l);const g=e.get(f);g!==void 0&&(e.delete(f),g.dispose())}function h(u){const f=u.target;f.removeEventListener("dispose",h);const g=t.get(f);g!==void 0&&(t.delete(f),g.dispose())}function d(){e=new WeakMap,t=new WeakMap,n!==null&&(n.dispose(),n=null)}return{get:i,dispose:d}}function M0(r){const e={};function t(n){if(e[n]!==void 0)return e[n];const i=r.getExtension(n);return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&ss("WebGLRenderer: "+n+" extension not supported."),i}}}function E0(r,e,t,n){const i={},s=new WeakMap;function a(d){const u=d.target;u.index!==null&&e.remove(u.index);for(const g in u.attributes)e.remove(u.attributes[g]);u.removeEventListener("dispose",a),delete i[u.id];const f=s.get(u);f&&(e.remove(f),s.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(d,u){return i[u.id]===!0||(u.addEventListener("dispose",a),i[u.id]=!0,t.memory.geometries++),u}function c(d){const u=d.attributes;for(const f in u)e.update(u[f],r.ARRAY_BUFFER)}function l(d){const u=[],f=d.index,g=d.attributes.position;let y=0;if(g===void 0)return;if(f!==null){const M=f.array;y=f.version;for(let C=0,v=M.length;C<v;C+=3){const E=M[C+0],b=M[C+1],A=M[C+2];u.push(E,b,b,A,A,E)}}else{const M=g.array;y=g.version;for(let C=0,v=M.length/3-1;C<v;C+=3){const E=C+0,b=C+1,A=C+2;u.push(E,b,b,A,A,E)}}const m=new(g.count>=65535?Dd:Ld)(u,1);m.version=y;const p=s.get(d);p&&e.remove(p),s.set(d,m)}function h(d){const u=s.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return s.get(d)}return{get:o,update:c,getWireframeAttribute:h}}function b0(r,e,t){let n;function i(d){n=d}let s,a;function o(d){s=d.type,a=d.bytesPerElement}function c(d,u){r.drawElements(n,u,s,d*a),t.update(u,n,1)}function l(d,u,f){f!==0&&(r.drawElementsInstanced(n,u,s,d*a,f),t.update(u,n,f))}function h(d,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,u,0,s,d,0,f);let y=0;for(let m=0;m<f;m++)y+=u[m];t.update(y,n,1)}this.setMode=i,this.setIndex=o,this.render=c,this.renderInstances=l,this.renderMultiDraw=h}function T0(r){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(s,a,o){switch(t.calls++,a){case r.TRIANGLES:t.triangles+=o*(s/3);break;case r.LINES:t.lines+=o*(s/2);break;case r.LINE_STRIP:t.lines+=o*(s-1);break;case r.LINE_LOOP:t.lines+=o*s;break;case r.POINTS:t.points+=o*s;break;default:Fe("WebGLInfo: Unknown draw mode:",a);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function w0(r,e,t){const n=new WeakMap,i=new ct;function s(a,o,c){const l=a.morphTargetInfluences,h=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=h!==void 0?h.length:0;let u=n.get(o);if(u===void 0||u.count!==d){let P=function(){x.dispose(),n.delete(o),o.removeEventListener("dispose",P)};var f=P;u!==void 0&&u.texture.dispose();const g=o.morphAttributes.position!==void 0,y=o.morphAttributes.normal!==void 0,m=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],M=o.morphAttributes.normal||[],C=o.morphAttributes.color||[];let v=0;g===!0&&(v=1),y===!0&&(v=2),m===!0&&(v=3);let E=o.attributes.position.count*v,b=1;E>e.maxTextureSize&&(b=Math.ceil(E/e.maxTextureSize),E=e.maxTextureSize);const A=new Float32Array(E*b*4*d),x=new Pd(A,E,b,d);x.type=on,x.needsUpdate=!0;const T=v*4;for(let D=0;D<d;D++){const O=p[D],H=M[D],U=C[D],G=E*b*4*D;for(let Z=0;Z<O.count;Z++){const X=Z*T;g===!0&&(i.fromBufferAttribute(O,Z),A[G+X+0]=i.x,A[G+X+1]=i.y,A[G+X+2]=i.z,A[G+X+3]=0),y===!0&&(i.fromBufferAttribute(H,Z),A[G+X+4]=i.x,A[G+X+5]=i.y,A[G+X+6]=i.z,A[G+X+7]=0),m===!0&&(i.fromBufferAttribute(U,Z),A[G+X+8]=i.x,A[G+X+9]=i.y,A[G+X+10]=i.z,A[G+X+11]=U.itemSize===4?i.w:1)}}u={count:d,texture:x,size:new Ne(E,b)},n.set(o,u),o.addEventListener("dispose",P)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)c.getUniforms().setValue(r,"morphTexture",a.morphTexture,t);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const y=o.morphTargetsRelative?1:1-g;c.getUniforms().setValue(r,"morphTargetBaseInfluence",y),c.getUniforms().setValue(r,"morphTargetInfluences",l)}c.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),c.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}return{update:s}}function A0(r,e,t,n,i){let s=new WeakMap;function a(l){const h=i.render.frame,d=l.geometry,u=e.get(l,d);if(s.get(u)!==h&&(e.update(u),s.set(u,h)),l.isInstancedMesh&&(l.hasEventListener("dispose",c)===!1&&l.addEventListener("dispose",c),s.get(l)!==h&&(t.update(l.instanceMatrix,r.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,r.ARRAY_BUFFER),s.set(l,h))),l.isSkinnedMesh){const f=l.skeleton;s.get(f)!==h&&(f.update(),s.set(f,h))}return u}function o(){s=new WeakMap}function c(l){const h=l.target;h.removeEventListener("dispose",c),n.releaseStatesOfObject(h),t.remove(h.instanceMatrix),h.instanceColor!==null&&t.remove(h.instanceColor)}return{update:a,dispose:o}}const R0={[hd]:"LINEAR_TONE_MAPPING",[dd]:"REINHARD_TONE_MAPPING",[ud]:"CINEON_TONE_MAPPING",[fd]:"ACES_FILMIC_TONE_MAPPING",[md]:"AGX_TONE_MAPPING",[gd]:"NEUTRAL_TONE_MAPPING",[pd]:"CUSTOM_TONE_MAPPING"};function C0(r,e,t,n,i,s){const a=new yn(e,t,{type:r,depthBuffer:i,stencilBuffer:s,samples:n?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1});let o=null,c=null;const l=new Lt;l.setAttribute("position",new mt([-1,3,0,-1,-1,0,3,-1,0],3)),l.setAttribute("uv",new mt([0,2,0,0,2,0],2));const h=new kp({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new Pe(l,h),u=new la(-1,1,1,-1,0,1);let f=null,g=null,y=!1,m,p=null,M=[],C=!1;this.setSize=function(v,E){a.setSize(v,E),o!==null&&o.setSize(v,E),c!==null&&c.setSize(v,E);for(let b=0;b<M.length;b++){const A=M[b];A.setSize&&A.setSize(v,E)}},this.setEffects=function(v){M=v,C=M.length>0&&M[0].isRenderPass===!0;const E=a.width,b=a.height;M.length>0&&o===null&&(o=new yn(E,b,{type:Bn,depthBuffer:!1,stencilBuffer:!1}),c=new yn(E,b,{type:Bn,depthBuffer:!1,stencilBuffer:!1}));for(let A=0;A<M.length;A++){const x=M[A];x.setSize&&x.setSize(E,b)}},this.begin=function(v,E){if(y||v.toneMapping===Un&&M.length===0)return!1;if(p=E,E!==null){const b=E.width,A=E.height;(a.width!==b||a.height!==A)&&this.setSize(b,A)}return C===!1&&v.setRenderTarget(a),m=v.toneMapping,v.toneMapping=Un,!0},this.hasRenderPass=function(){return C},this.end=function(v,E){v.toneMapping=m,y=!0;let b=a,A=o;for(let x=0;x<M.length;x++){const T=M[x];T.enabled!==!1&&(T.render(v,A,b,E),T.needsSwap!==!1&&(b=A,A=A===o?c:o))}if(f!==v.outputColorSpace||g!==v.toneMapping){f=v.outputColorSpace,g=v.toneMapping,h.defines={},qe.getTransfer(f)===rt&&(h.defines.SRGB_TRANSFER="");const x=R0[g];x&&(h.defines[x]=""),h.needsUpdate=!0}h.uniforms.tDiffuse.value=b.texture,v.setRenderTarget(p),v.render(d,u),p=null,y=!1},this.isCompositing=function(){return y},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),c!==null&&c.dispose(),l.dispose(),h.dispose()}}const jd=new St,sc=new $s(1,1),Jd=new Pd,Qd=new hp,eu=new kd,_h=[],xh=[],vh=new Float32Array(16),Sh=new Float32Array(9),yh=new Float32Array(4);function ms(r,e,t){const n=r[0];if(n<=0||n>0)return r;const i=e*t;let s=_h[i];if(s===void 0&&(s=new Float32Array(i),_h[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Ct(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Pt(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function da(r,e){let t=xh[e];t===void 0&&(t=new Int32Array(e),xh[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function P0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function I0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2fv(this.addr,e),Pt(t,e)}}function L0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;r.uniform3fv(this.addr,e),Pt(t,e)}}function D0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4fv(this.addr,e),Pt(t,e)}}function N0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;yh.set(n),r.uniformMatrix2fv(this.addr,!1,yh),Pt(t,n)}}function F0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;Sh.set(n),r.uniformMatrix3fv(this.addr,!1,Sh),Pt(t,n)}}function U0(r,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Pt(t,e)}else{if(Ct(t,n))return;vh.set(n),r.uniformMatrix4fv(this.addr,!1,vh),Pt(t,n)}}function O0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function B0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2iv(this.addr,e),Pt(t,e)}}function k0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3iv(this.addr,e),Pt(t,e)}}function z0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4iv(this.addr,e),Pt(t,e)}}function G0(r,e){const t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function H0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;r.uniform2uiv(this.addr,e),Pt(t,e)}}function V0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;r.uniform3uiv(this.addr,e),Pt(t,e)}}function W0(r,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;r.uniform4uiv(this.addr,e),Pt(t,e)}}function X0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i);let s;this.type===r.SAMPLER_2D_SHADOW?(sc.compareFunction=t.isReversedDepthBuffer()?Rc:Ac,s=sc):s=jd,t.setTexture2D(e||s,i)}function q0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Qd,i)}function K0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||eu,i)}function $0(r,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Jd,i)}function Y0(r){switch(r){case 5126:return P0;case 35664:return I0;case 35665:return L0;case 35666:return D0;case 35674:return N0;case 35675:return F0;case 35676:return U0;case 5124:case 35670:return O0;case 35667:case 35671:return B0;case 35668:case 35672:return k0;case 35669:case 35673:return z0;case 5125:return G0;case 36294:return H0;case 36295:return V0;case 36296:return W0;case 35678:case 36198:case 36298:case 36306:case 35682:return X0;case 35679:case 36299:case 36307:return q0;case 35680:case 36300:case 36308:case 36293:return K0;case 36289:case 36303:case 36311:case 36292:return $0}}function Z0(r,e){r.uniform1fv(this.addr,e)}function j0(r,e){const t=ms(e,this.size,2);r.uniform2fv(this.addr,t)}function J0(r,e){const t=ms(e,this.size,3);r.uniform3fv(this.addr,t)}function Q0(r,e){const t=ms(e,this.size,4);r.uniform4fv(this.addr,t)}function ex(r,e){const t=ms(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function tx(r,e){const t=ms(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function nx(r,e){const t=ms(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function ix(r,e){r.uniform1iv(this.addr,e)}function sx(r,e){r.uniform2iv(this.addr,e)}function rx(r,e){r.uniform3iv(this.addr,e)}function ax(r,e){r.uniform4iv(this.addr,e)}function ox(r,e){r.uniform1uiv(this.addr,e)}function cx(r,e){r.uniform2uiv(this.addr,e)}function lx(r,e){r.uniform3uiv(this.addr,e)}function hx(r,e){r.uniform4uiv(this.addr,e)}function dx(r,e,t){const n=this.cache,i=e.length,s=da(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));let a;this.type===r.SAMPLER_2D_SHADOW?a=sc:a=jd;for(let o=0;o!==i;++o)t.setTexture2D(e[o]||a,s[o])}function ux(r,e,t){const n=this.cache,i=e.length,s=da(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||Qd,s[a])}function fx(r,e,t){const n=this.cache,i=e.length,s=da(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||eu,s[a])}function px(r,e,t){const n=this.cache,i=e.length,s=da(t,i);Ct(n,s)||(r.uniform1iv(this.addr,s),Pt(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||Jd,s[a])}function mx(r){switch(r){case 5126:return Z0;case 35664:return j0;case 35665:return J0;case 35666:return Q0;case 35674:return ex;case 35675:return tx;case 35676:return nx;case 5124:case 35670:return ix;case 35667:case 35671:return sx;case 35668:case 35672:return rx;case 35669:case 35673:return ax;case 5125:return ox;case 36294:return cx;case 36295:return lx;case 36296:return hx;case 35678:case 36198:case 36298:case 36306:case 35682:return dx;case 35679:case 36299:case 36307:return ux;case 35680:case 36300:case 36308:case 36293:return fx;case 36289:case 36303:case 36311:case 36292:return px}}class gx{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=Y0(t.type)}}class _x{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=mx(t.type)}}class xx{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let s=0,a=i.length;s!==a;++s){const o=i[s];o.setValue(e,t[o.id],n)}}}const Ja=/(\w+)(\])?(\[|\.)?/g;function Mh(r,e){r.seq.push(e),r.map[e.id]=e}function vx(r,e,t){const n=r.name,i=n.length;for(Ja.lastIndex=0;;){const s=Ja.exec(n),a=Ja.lastIndex;let o=s[1];const c=s[2]==="]",l=s[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Mh(t,l===void 0?new gx(o,r,e):new _x(o,r,e));break}else{let d=t.map[o];d===void 0&&(d=new xx(o),Mh(t,d)),t=d}}}class Wr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<n;++a){const o=e.getActiveUniform(t,a),c=e.getUniformLocation(t,o.name);vx(o,c,this)}const i=[],s=[];for(const a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?i.push(a):s.push(a);i.length>0&&(this.seq=i.concat(s))}setValue(e,t,n,i){const s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){const o=t[s],c=n[o.id];c.needsUpdate!==!1&&o.setValue(e,c.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,s=e.length;i!==s;++i){const a=e[i];a.id in t&&n.push(a)}return n}}function Eh(r,e,t){const n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}const Sx=37297;let yx=0;function Mx(r,e){const t=r.split(`
`),n=[],i=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let a=i;a<s;a++){const o=a+1;n.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return n.join(`
`)}const bh=new Oe;function Ex(r){qe._getMatrix(bh,qe.workingColorSpace,r);const e=`mat3( ${bh.elements.map(t=>t.toFixed(4))} )`;switch(qe.getTransfer(r)){case jr:return[e,"LinearTransferOETF"];case rt:return[e,"sRGBTransferOETF"];default:return we("WebGLProgram: Unsupported color space: ",r),[e,"LinearTransferOETF"]}}function Th(r,e,t){const n=r.getShaderParameter(e,r.COMPILE_STATUS),s=(r.getShaderInfoLog(e)||"").trim();if(n&&s==="")return"";const a=/ERROR: 0:(\d+)/.exec(s);if(a){const o=parseInt(a[1]);return t.toUpperCase()+`

`+s+`

`+Mx(r.getShaderSource(e),o)}else return s}function bx(r,e){const t=Ex(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}const Tx={[hd]:"Linear",[dd]:"Reinhard",[ud]:"Cineon",[fd]:"ACESFilmic",[md]:"AgX",[gd]:"Neutral",[pd]:"Custom"};function wx(r,e){const t=Tx[e];return t===void 0?(we("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+r+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const Dr=new I;function Ax(){qe.getLuminanceCoefficients(Dr);const r=Dr.x.toFixed(4),e=Dr.y.toFixed(4),t=Dr.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${r}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Rx(r){return[r.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",r.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Ns).join(`
`)}function Cx(r){const e=[];for(const t in r){const n=r[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function Px(r,e){const t={},n=r.getProgramParameter(e,r.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const s=r.getActiveAttrib(e,i),a=s.name;let o=1;s.type===r.FLOAT_MAT2&&(o=2),s.type===r.FLOAT_MAT3&&(o=3),s.type===r.FLOAT_MAT4&&(o=4),t[a]={type:s.type,location:r.getAttribLocation(e,a),locationSize:o}}return t}function Ns(r){return r!==""}function wh(r,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function Ah(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Ix=/^[ \t]*#include +<([\w\d./]+)>/gm;function rc(r){return r.replace(Ix,Dx)}const Lx=new Map;function Dx(r,e){let t=Ge[e];if(t===void 0){const n=Lx.get(e);if(n!==void 0)t=Ge[n],we('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return rc(t)}const Nx=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Rh(r){return r.replace(Nx,Fx)}function Fx(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function Ch(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}const Ux={[Or]:"SHADOWMAP_TYPE_PCF",[Ls]:"SHADOWMAP_TYPE_VSM"};function Ox(r){return Ux[r.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}const Bx={[Pi]:"ENVMAP_TYPE_CUBE",[os]:"ENVMAP_TYPE_CUBE",[aa]:"ENVMAP_TYPE_CUBE_UV"};function kx(r){return r.envMap===!1?"ENVMAP_TYPE_CUBE":Bx[r.envMapMode]||"ENVMAP_TYPE_CUBE"}const zx={[os]:"ENVMAP_MODE_REFRACTION"};function Gx(r){return r.envMap===!1?"ENVMAP_MODE_REFLECTION":zx[r.envMapMode]||"ENVMAP_MODE_REFLECTION"}const Hx={[ld]:"ENVMAP_BLENDING_MULTIPLY",[Ef]:"ENVMAP_BLENDING_MIX",[bf]:"ENVMAP_BLENDING_ADD"};function Vx(r){return r.envMap===!1?"ENVMAP_BLENDING_NONE":Hx[r.combine]||"ENVMAP_BLENDING_NONE"}function Wx(r){const e=r.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:n,maxMip:t}}function Xx(r,e,t,n){const i=r.getContext(),s=t.defines;let a=t.vertexShader,o=t.fragmentShader;const c=Ox(t),l=kx(t),h=Gx(t),d=Vx(t),u=Wx(t),f=Rx(t),g=Cx(s),y=i.createProgram();let m,p,M=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ns).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Ns).join(`
`),p.length>0&&(p+=`
`)):(m=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ns).join(`
`),p=[Ch(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+l:"",t.envMap?"#define "+h:"",t.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+c:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?Ge.tonemapping_pars_fragment:"",t.toneMapping!==Un?wx("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,bx("linearToOutputTexel",t.outputColorSpace),Ax(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Ns).join(`
`)),a=rc(a),a=wh(a,t),a=Ah(a,t),o=rc(o),o=wh(o,t),o=Ah(o,t),a=Rh(a),o=Rh(o),t.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const C=M+m+a,v=M+p+o,E=Eh(i,i.VERTEX_SHADER,C),b=Eh(i,i.FRAGMENT_SHADER,v);i.attachShader(y,E),i.attachShader(y,b),t.index0AttributeName!==void 0?i.bindAttribLocation(y,0,t.index0AttributeName):t.hasPositionAttribute===!0&&i.bindAttribLocation(y,0,"position"),i.linkProgram(y);function A(D){if(r.debug.checkShaderErrors){const O=i.getProgramInfoLog(y)||"",H=i.getShaderInfoLog(E)||"",U=i.getShaderInfoLog(b)||"",G=O.trim(),Z=H.trim(),X=U.trim();let ie=!0,K=!0;if(i.getProgramParameter(y,i.LINK_STATUS)===!1)if(ie=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,y,E,b);else{const ee=Th(i,E,"vertex"),ne=Th(i,b,"fragment");Fe("WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(y,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+G+`
`+ee+`
`+ne)}else G!==""?we("WebGLProgram: Program Info Log:",G):(Z===""||X==="")&&(K=!1);K&&(D.diagnostics={runnable:ie,programLog:G,vertexShader:{log:Z,prefix:m},fragmentShader:{log:X,prefix:p}})}i.deleteShader(E),i.deleteShader(b),x=new Wr(i,y),T=Px(i,y)}let x;this.getUniforms=function(){return x===void 0&&A(this),x};let T;this.getAttributes=function(){return T===void 0&&A(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=i.getProgramParameter(y,Sx)),P},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(y),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=yx++,this.cacheKey=e,this.usedTimes=1,this.program=y,this.vertexShader=E,this.fragmentShader=b,this}let qx=0;class Kx{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,n){const i=this._getShaderCacheForMaterial(e);return i.has(t)===!1&&(i.add(t),t.usedTimes++),i.has(n)===!1&&(i.add(n),n.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new $x(e),t.set(e,n)),n}}class $x{constructor(e){this.id=qx++,this.code=e,this.usedTimes=0}}function Yx(r){return r===Ii||r===$r||r===Yr}function Zx(r,e,t,n,i,s){const a=new Ic,o=new Kx,c=new Set,l=[],h=new Map,d=n.logarithmicDepthBuffer;let u=n.precision;const f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function g(x){return c.add(x),x===0?"uv":`uv${x}`}function y(x,T,P,D,O,H){const U=D.fog,G=O.geometry,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?D.environment:null,X=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ie=e.get(x.envMap||Z,X),K=ie&&ie.mapping===aa?ie.image.height:null,ee=f[x.type];x.precision!==null&&(u=n.getMaxPrecision(x.precision),u!==x.precision&&we("WebGLProgram.getParameters:",x.precision,"not supported, using",u,"instead."));const ne=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Le=ne!==void 0?ne.length:0;let Ae=0;G.morphAttributes.position!==void 0&&(Ae=1),G.morphAttributes.normal!==void 0&&(Ae=2),G.morphAttributes.color!==void 0&&(Ae=3);let dt,Ye,Je,$;if(ee){const ft=Ln[ee];dt=ft.vertexShader,Ye=ft.fragmentShader}else{dt=x.vertexShader,Ye=x.fragmentShader;const ft=o.getVertexShaderStage(x),et=o.getFragmentShaderStage(x);o.update(x,ft,et),Je=ft.id,$=et.id}const Q=r.getRenderTarget(),xe=r.state.buffers.depth.getReversed(),Ue=O.isInstancedMesh===!0,ge=O.isBatchedMesh===!0,He=!!x.map,Tt=!!x.matcap,We=!!ie,je=!!x.aoMap,ut=!!x.lightMap,$e=!!x.bumpMap&&x.wireframe===!1,_t=!!x.normalMap,Dt=!!x.displacementMap,Kt=!!x.emissiveMap,xt=!!x.metalnessMap,Mt=!!x.roughnessMap,F=x.anisotropy>0,kt=x.clearcoat>0,it=x.dispersion>0,R=x.retroreflectivity>0,_=x.iridescence>0,B=x.sheen>0,V=x.transmission>0,q=F&&!!x.anisotropyMap,se=kt&&!!x.clearcoatMap,re=kt&&!!x.clearcoatNormalMap,Y=kt&&!!x.clearcoatRoughnessMap,J=_&&!!x.iridescenceMap,ae=_&&!!x.iridescenceThicknessMap,be=B&&!!x.sheenColorMap,he=B&&!!x.sheenRoughnessMap,oe=!!x.specularMap,Te=!!x.specularColorMap,De=!!x.specularIntensityMap,Be=V&&!!x.transmissionMap,N=V&&!!x.thicknessMap,ce=!!x.gradientMap,j=!!x.alphaMap,le=x.alphaTest>0,pe=!!x.alphaHash,te=!!x.extensions;let Re=Un;x.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Re=r.toneMapping);const Me={shaderID:ee,shaderType:x.type,shaderName:x.name,vertexShader:dt,fragmentShader:Ye,defines:x.defines,customVertexShaderID:Je,customFragmentShaderID:$,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:u,batching:ge,batchingColor:ge&&O._colorsTexture!==null,instancing:Ue,instancingColor:Ue&&O.instanceColor!==null,instancingMorph:Ue&&O.morphTexture!==null,outputColorSpace:Q===null?r.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:qe.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:He,matcap:Tt,envMap:We,envMapMode:We&&ie.mapping,envMapCubeUVHeight:K,aoMap:je,lightMap:ut,bumpMap:$e,normalMap:_t,displacementMap:Dt,emissiveMap:Kt,normalMapObjectSpace:_t&&x.normalMapType===Pf,normalMapTangentSpace:_t&&x.normalMapType===ec,packedNormalMap:_t&&x.normalMapType===ec&&Yx(x.normalMap.format),metalnessMap:xt,roughnessMap:Mt,anisotropy:F,anisotropyMap:q,clearcoat:kt,clearcoatMap:se,clearcoatNormalMap:re,clearcoatRoughnessMap:Y,dispersion:it,retroreflection:R,iridescence:_,iridescenceMap:J,iridescenceThicknessMap:ae,sheen:B,sheenColorMap:be,sheenRoughnessMap:he,specularMap:oe,specularColorMap:Te,specularIntensityMap:De,transmission:V,transmissionMap:Be,thicknessMap:N,gradientMap:ce,opaque:x.transparent===!1&&x.blending===Fs&&x.alphaToCoverage===!1,alphaMap:j,alphaTest:le,alphaHash:pe,combine:x.combine,mapUv:He&&g(x.map.channel),aoMapUv:je&&g(x.aoMap.channel),lightMapUv:ut&&g(x.lightMap.channel),bumpMapUv:$e&&g(x.bumpMap.channel),normalMapUv:_t&&g(x.normalMap.channel),displacementMapUv:Dt&&g(x.displacementMap.channel),emissiveMapUv:Kt&&g(x.emissiveMap.channel),metalnessMapUv:xt&&g(x.metalnessMap.channel),roughnessMapUv:Mt&&g(x.roughnessMap.channel),anisotropyMapUv:q&&g(x.anisotropyMap.channel),clearcoatMapUv:se&&g(x.clearcoatMap.channel),clearcoatNormalMapUv:re&&g(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Y&&g(x.clearcoatRoughnessMap.channel),iridescenceMapUv:J&&g(x.iridescenceMap.channel),iridescenceThicknessMapUv:ae&&g(x.iridescenceThicknessMap.channel),sheenColorMapUv:be&&g(x.sheenColorMap.channel),sheenRoughnessMapUv:he&&g(x.sheenRoughnessMap.channel),specularMapUv:oe&&g(x.specularMap.channel),specularColorMapUv:Te&&g(x.specularColorMap.channel),specularIntensityMapUv:De&&g(x.specularIntensityMap.channel),transmissionMapUv:Be&&g(x.transmissionMap.channel),thicknessMapUv:N&&g(x.thicknessMap.channel),alphaMapUv:j&&g(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(_t||F),vertexNormals:!!G.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:O.isPoints===!0&&!!G.attributes.uv&&(He||j),fog:!!U,useFog:x.fog===!0,fogExp2:!!U&&U.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||G.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:xe,skinning:O.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Le,morphTextureStride:Ae,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:H.length,numClippingPlanes:s.numPlanes,numClipIntersection:s.numIntersection,dithering:x.dithering,shadowMapEnabled:r.shadowMap.enabled&&P.length>0,shadowMapType:r.shadowMap.type,toneMapping:Re,decodeVideoTexture:He&&x.map.isVideoTexture===!0&&qe.getTransfer(x.map.colorSpace)===rt,decodeVideoTextureEmissive:Kt&&x.emissiveMap.isVideoTexture===!0&&qe.getTransfer(x.emissiveMap.colorSpace)===rt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Dn,flipSided:x.side===$t,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:te&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(te&&x.extensions.multiDraw===!0||ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Me.vertexUv1s=c.has(1),Me.vertexUv2s=c.has(2),Me.vertexUv3s=c.has(3),c.clear(),Me}function m(x){const T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(const P in x.defines)T.push(P),T.push(x.defines[P]);return x.isRawShaderMaterial===!1&&(p(T,x),M(T,x),T.push(r.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function p(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function M(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function C(x){const T=f[x.type];let P;if(T){const D=Ln[T];P=Up.clone(D.uniforms)}else P=x.uniforms;return P}function v(x,T){let P=h.get(T);return P!==void 0?++P.usedTimes:(P=new Xx(r,T,x,i),l.push(P),h.set(T,P)),P}function E(x){if(--x.usedTimes===0){const T=l.indexOf(x);l[T]=l[l.length-1],l.pop(),h.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function A(){o.dispose()}return{getParameters:y,getProgramCacheKey:m,getUniforms:C,acquireProgram:v,releaseProgram:E,releaseShaderCache:b,programs:l,dispose:A}}function jx(){let r=new WeakMap;function e(a){return r.has(a)}function t(a){let o=r.get(a);return o===void 0&&(o={},r.set(a,o)),o}function n(a){r.delete(a)}function i(a,o,c){r.get(a)[o]=c}function s(){r=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:s}}function Jx(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.materialVariant!==e.materialVariant?r.materialVariant-e.materialVariant:r.z!==e.z?r.z-e.z:r.id-e.id}function Ph(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function Ih(){const r=[];let e=0;const t=[],n=[],i=[];function s(){e=0,t.length=0,n.length=0,i.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,g,y,m,p){let M=r[e];return M===void 0?(M={id:u.id,object:u,geometry:f,material:g,materialVariant:a(u),groupOrder:y,renderOrder:u.renderOrder,z:m,group:p},r[e]=M):(M.id=u.id,M.object=u,M.geometry=f,M.material=g,M.materialVariant=a(u),M.groupOrder=y,M.renderOrder=u.renderOrder,M.z=m,M.group=p),e++,M}function c(u,f,g,y,m,p,M){M.reversedDepth===!0&&(m=-m);const C=o(u,f,g,y,m,p);g.transmission>0?n.push(C):g.transparent===!0?i.push(C):t.push(C)}function l(u,f,g,y,m,p){const M=o(u,f,g,y,m,p);g.transmission>0?n.unshift(M):g.transparent===!0?i.unshift(M):t.unshift(M)}function h(u,f){t.length>1&&t.sort(u||Jx),n.length>1&&n.sort(f||Ph),i.length>1&&i.sort(f||Ph)}function d(){for(let u=e,f=r.length;u<f;u++){const g=r[u];if(g.id===null)break;g.id=null,g.object=null,g.geometry=null,g.material=null,g.group=null}}return{opaque:t,transmissive:n,transparent:i,init:s,push:c,unshift:l,finish:d,sort:h}}function Qx(){let r=new WeakMap;function e(n,i){const s=r.get(n);let a;return s===void 0?(a=new Ih,r.set(n,[a])):i>=s.length?(a=new Ih,s.push(a)):a=s[i],a}function t(){r=new WeakMap}return{get:e,dispose:t}}function ev(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new I,color:new Ce};break;case"SpotLight":t={position:new I,direction:new I,color:new Ce,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new I,color:new Ce,distance:0,decay:0};break;case"HemisphereLight":t={direction:new I,skyColor:new Ce,groundColor:new Ce};break;case"RectAreaLight":t={color:new Ce,position:new I,halfWidth:new I,halfHeight:new I};break}return r[e.id]=t,t}}}function tv(){const r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Ne,shadowCameraNear:1,shadowCameraFar:1e3};break}return r[e.id]=t,t}}}let nv=0;function iv(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function sv(r){const e=new ev,t=tv(),n={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new I);const i=new I,s=new ke,a=new ke;function o(l){let h=0,d=0,u=0;for(let O=0;O<9;O++)n.probe[O].set(0,0,0);let f=0,g=0,y=0,m=0,p=0,M=0,C=0,v=0,E=0,b=0,A=0,x=0,T=0,P=0;l.sort(iv);for(let O=0,H=l.length;O<H;O++){const U=l[O],G=U.color,Z=U.intensity,X=U.distance;let ie=null;if(U.shadow&&U.shadow.map&&(U.shadow.map.texture.format===Ii?ie=U.shadow.map.texture:ie=U.shadow.map.depthTexture||U.shadow.map.texture),U.isAmbientLight)h+=G.r*Z,d+=G.g*Z,u+=G.b*Z;else if(U.isLightProbe){for(let K=0;K<9;K++)n.probe[K].addScaledVector(U.sh.coefficients[K],Z);P++}else if(U.isSunLight){const K=e.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ee=U.shadow,ne=t.get(U);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize.copy(ee.mapSize).multiply(ee.getFrameExtents()),n.sunShadow[g]=ne,n.sunShadowMap[g]=ie;const Le=ee.getViewportCount();for(let Ae=0;Ae<Le;Ae++)n.sunShadowMatrix[y+Ae]=ee.getMatrix(Ae),n.sunShadowCascade[y+Ae]=ee._cascadeData[Ae];y+=Le,g++}n.sun[f]=K,f++}else if(U.isDirectionalLight){const K=e.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity),U.castShadow){const ee=U.shadow,ne=t.get(U);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.directionalShadow[m]=ne,n.directionalShadowMap[m]=ie,n.directionalShadowMatrix[m]=U.shadow.matrix,E++}n.directional[m]=K,m++}else if(U.isSpotLight){const K=e.get(U);K.position.setFromMatrixPosition(U.matrixWorld),K.color.copy(G).multiplyScalar(Z),K.distance=X,K.coneCos=Math.cos(U.angle),K.penumbraCos=Math.cos(U.angle*(1-U.penumbra)),K.decay=U.decay,n.spot[M]=K;const ee=U.shadow;if(U.map&&(n.spotLightMap[x]=U.map,x++,ee.updateMatrices(U),U.castShadow&&T++),n.spotLightMatrix[M]=ee.matrix,U.castShadow){const ne=t.get(U);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,n.spotShadow[M]=ne,n.spotShadowMap[M]=ie,A++}M++}else if(U.isRectAreaLight){const K=e.get(U);K.color.copy(G).multiplyScalar(Z),K.halfWidth.set(U.width*.5,0,0),K.halfHeight.set(0,U.height*.5,0),n.rectArea[C]=K,C++}else if(U.isPointLight){const K=e.get(U);if(K.color.copy(U.color).multiplyScalar(U.intensity),K.distance=U.distance,K.decay=U.decay,U.castShadow){const ee=U.shadow,ne=t.get(U);ne.shadowIntensity=ee.intensity,ne.shadowBias=ee.bias,ne.shadowNormalBias=ee.normalBias,ne.shadowRadius=ee.radius,ne.shadowMapSize=ee.mapSize,ne.shadowCameraNear=ee.camera.near,ne.shadowCameraFar=ee.camera.far,n.pointShadow[p]=ne,n.pointShadowMap[p]=ie,n.pointShadowMatrix[p]=U.shadow.matrix,b++}n.point[p]=K,p++}else if(U.isHemisphereLight){const K=e.get(U);K.skyColor.copy(U.color).multiplyScalar(Z),K.groundColor.copy(U.groundColor).multiplyScalar(Z),n.hemi[v]=K,v++}}C>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=h,n.ambient[1]=d,n.ambient[2]=u;const D=n.hash;(D.sunLength!==f||D.directionalLength!==m||D.pointLength!==p||D.spotLength!==M||D.rectAreaLength!==C||D.hemiLength!==v||D.numSunShadows!==g||D.numDirectionalShadows!==E||D.numPointShadows!==b||D.numSpotShadows!==A||D.numSpotMaps!==x||D.numLightProbes!==P)&&(n.sun.length=f,n.directional.length=m,n.spot.length=M,n.rectArea.length=C,n.point.length=p,n.hemi.length=v,n.sunShadow.length=g,n.sunShadowMap.length=g,n.sunShadowMatrix.length=y,n.sunShadowCascade.length=y,n.directionalShadow.length=E,n.directionalShadowMap.length=E,n.directionalShadowMatrix.length=E,n.pointShadow.length=b,n.pointShadowMap.length=b,n.pointShadowMatrix.length=b,n.spotShadow.length=A,n.spotShadowMap.length=A,n.spotLightMatrix.length=A+x-T,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=T,n.numLightProbes=P,D.sunLength=f,D.directionalLength=m,D.pointLength=p,D.spotLength=M,D.rectAreaLength=C,D.hemiLength=v,D.numSunShadows=g,D.numDirectionalShadows=E,D.numPointShadows=b,D.numSpotShadows=A,D.numSpotMaps=x,D.numLightProbes=P,n.version=nv++)}function c(l,h){let d=0,u=0,f=0,g=0,y=0,m=0;const p=h.matrixWorldInverse;for(let M=0,C=l.length;M<C;M++){const v=l[M];if(v.isSunLight){const E=n.sun[d];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(p),d++}else if(v.isDirectionalLight){const E=n.directional[u];E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),u++}else if(v.isSpotLight){const E=n.spot[g];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),E.direction.setFromMatrixPosition(v.matrixWorld),i.setFromMatrixPosition(v.target.matrixWorld),E.direction.sub(i),E.direction.transformDirection(p),g++}else if(v.isRectAreaLight){const E=n.rectArea[y];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),a.identity(),s.copy(v.matrixWorld),s.premultiply(p),a.extractRotation(s),E.halfWidth.set(v.width*.5,0,0),E.halfHeight.set(0,v.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),y++}else if(v.isPointLight){const E=n.point[f];E.position.setFromMatrixPosition(v.matrixWorld),E.position.applyMatrix4(p),f++}else if(v.isHemisphereLight){const E=n.hemi[m];E.direction.setFromMatrixPosition(v.matrixWorld),E.direction.transformDirection(p),m++}}}return{setup:o,setupView:c,state:n}}function Lh(r){const e=new sv(r),t=[],n=[],i=[];function s(u){d.camera=u,t.length=0,n.length=0,i.length=0}function a(u){t.push(u)}function o(u){n.push(u)}function c(u){i.push(u)}function l(){e.setup(t)}function h(u){e.setupView(t,u)}const d={lightsArray:t,shadowsArray:n,lightProbeGridArray:i,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:s,state:d,setupLights:l,setupLightsView:h,pushLight:a,pushShadow:o,pushLightProbeGrid:c}}function rv(r){let e=new WeakMap;function t(i,s=0){const a=e.get(i);let o;return a===void 0?(o=new Lh(r),e.set(i,[o])):s>=a.length?(o=new Lh(r),a.push(o)):o=a[s],o}function n(){e=new WeakMap}return{get:t,dispose:n}}const av=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,ov=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,cv=[new I(1,0,0),new I(-1,0,0),new I(0,1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1)],lv=[new I(0,-1,0),new I(0,-1,0),new I(0,0,1),new I(0,0,-1),new I(0,-1,0),new I(0,-1,0)],Dh=new ke,Ps=new I,Qa=new I;function hv(r,e,t){let n=new Fc;const i=new Ne,s=new Ne,a=new ct,o=new zp,c=new Gp,l={},h=t.maxTextureSize,d={[_i]:$t,[$t]:_i,[Dn]:Dn},u=new kn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Ne},radius:{value:4}},vertexShader:av,fragmentShader:ov}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new Lt;g.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const y=new Pe(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Or;let p=this.type;this.render=function(b,A,x){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||b.length===0)return;this.type===ad&&(we("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Or);const T=r.getRenderTarget(),P=r.getActiveCubeFace(),D=r.getActiveMipmapLevel(),O=r.state;O.setBlending(Qn),O.buffers.depth.getReversed()===!0?O.buffers.color.setClear(0,0,0,0):O.buffers.color.setClear(1,1,1,1),O.buffers.depth.setTest(!0),O.setScissorTest(!1);const H=p!==this.type;H&&A.traverse(function(U){U.material&&(Array.isArray(U.material)?U.material.forEach(G=>G.needsUpdate=!0):U.material.needsUpdate=!0)});for(let U=0,G=b.length;U<G;U++){const Z=b[U],X=Z.shadow;if(X===void 0){we("WebGLShadowMap:",Z,"has no shadow.");continue}if(X.autoUpdate===!1&&X.needsUpdate===!1)continue;i.copy(X.mapSize);const ie=X.getFrameExtents();i.multiply(ie),s.copy(X.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ie.x),i.x=s.x*ie.x,X.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ie.y),i.y=s.y*ie.y,X.mapSize.y=s.y));const K=r.state.buffers.depth.getReversed();if(X.camera._reversedDepth=K,X.map===null||H===!0){if(X.map!==null&&(X.map.depthTexture!==null&&(X.map.depthTexture.dispose(),X.map.depthTexture=null),X.map.dispose()),this.type===Ls){if(Z.isPointLight){we("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}X.map=new yn(i.x,i.y,{format:Ii,type:Bn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),X.map.texture.name=Z.name+".shadowMap",X.map.depthTexture=new $s(i.x,i.y,on),X.map.depthTexture.name=Z.name+".shadowMapDepth",X.map.depthTexture.format=ti,X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=At,X.map.depthTexture.magFilter=At}else Z.isPointLight?(X.map=new Zd(i.x),X.map.depthTexture=new Np(i.x,On)):(X.map=new yn(i.x,i.y),X.map.depthTexture=new $s(i.x,i.y,On)),X.map.depthTexture.name=Z.name+".shadowMap",X.map.depthTexture.format=ti,this.type===Or?(X.map.depthTexture.compareFunction=K?Rc:Ac,X.map.depthTexture.minFilter=Rt,X.map.depthTexture.magFilter=Rt):(X.map.depthTexture.compareFunction=null,X.map.depthTexture.minFilter=At,X.map.depthTexture.magFilter=At);X.camera.updateProjectionMatrix()}X.map.isWebGLCubeRenderTarget!==!0&&(X.map.width!==i.x||X.map.height!==i.y)&&X.map.setSize(i.x,i.y);const ee=X.map.isWebGLCubeRenderTarget?6:X.getViewportCount();Z.isPointLight!==!0&&X.updateMatrices(Z,x);for(let ne=0;ne<ee;ne++){const Le=X.getCamera(ne);if(Z.isPointLight){const Ae=X.camera,dt=X.matrix,Ye=Z.distance||Ae.far;Ye!==Ae.far&&(Ae.far=Ye,Ae.updateProjectionMatrix()),Ps.setFromMatrixPosition(Z.matrixWorld),Ae.position.copy(Ps),Qa.copy(Ae.position),Qa.add(cv[ne]),Ae.up.copy(lv[ne]),Ae.lookAt(Qa),Ae.updateMatrixWorld(),dt.makeTranslation(-Ps.x,-Ps.y,-Ps.z),Dh.multiplyMatrices(Ae.projectionMatrix,Ae.matrixWorldInverse),X._frustum.setFromProjectionMatrix(Dh,Ae.coordinateSystem,Ae.reversedDepth)}if(X.map.isWebGLCubeRenderTarget)r.setRenderTarget(X.map,ne),r.clear();else{ne===0&&(r.setRenderTarget(X.map),r.clear());const Ae=X.getViewport(ne);a.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),O.viewport(a)}n=X.getFrustum(ne),v(A,x,Le,Z,this.type)}X.isPointLightShadow!==!0&&this.type===Ls&&M(X,x),X.needsUpdate=!1}p=this.type,m.needsUpdate=!1,r.setRenderTarget(T,P,D)};function M(b,A){const x=e.update(y);u.defines.VSM_SAMPLES!==b.blurSamples&&(u.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new yn(i.x,i.y,{format:Ii,type:Bn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),u.uniforms.shadow_pass.value=b.map.depthTexture,u.uniforms.resolution.value.set(b.map.width,b.map.height),u.uniforms.radius.value=b.radius,r.setRenderTarget(b.mapPass),r.clear(),r.renderBufferDirect(A,null,x,u,y,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,r.setRenderTarget(b.map),r.clear(),r.renderBufferDirect(A,null,x,f,y,null)}function C(b,A,x,T){let P=null;const D=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(D!==void 0)P=D;else if(P=x.isPointLight===!0?c:o,r.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){const O=P.uuid,H=A.uuid;let U=l[O];U===void 0&&(U={},l[O]=U);let G=U[H];G===void 0&&(G=P.clone(),U[H]=G,A.addEventListener("dispose",E)),P=G}if(P.visible=A.visible,P.wireframe=A.wireframe,T===Ls?P.side=A.shadowSide!==null?A.shadowSide:A.side:P.side=A.shadowSide!==null?A.shadowSide:d[A.side],P.alphaMap=A.alphaMap,P.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,P.map=A.map,P.clipShadows=A.clipShadows,P.clippingPlanes=A.clippingPlanes,P.clipIntersection=A.clipIntersection,P.displacementMap=A.displacementMap,P.displacementScale=A.displacementScale,P.displacementBias=A.displacementBias,P.wireframeLinewidth=A.wireframeLinewidth,P.linewidth=A.linewidth,x.isPointLight===!0&&P.isMeshDistanceMaterial===!0){const O=r.properties.get(P);O.light=x}return P}function v(b,A,x,T,P){if(b.visible===!1)return;if(b.layers.test(A.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&P===Ls)&&(!b.frustumCulled||b.intersectsFrustum(n))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);const H=e.update(b),U=b.material;if(Array.isArray(U)){const G=H.groups;for(let Z=0,X=G.length;Z<X;Z++){const ie=G[Z],K=U[ie.materialIndex];if(K&&K.visible){const ee=C(b,K,T,P);b.onBeforeShadow(r,b,A,x,H,ee,ie),r.renderBufferDirect(x,null,H,ee,b,ie),b.onAfterShadow(r,b,A,x,H,ee,ie)}}}else if(U.visible){const G=C(b,U,T,P);b.onBeforeShadow(r,b,A,x,H,G,null),r.renderBufferDirect(x,null,H,G,b,null),b.onAfterShadow(r,b,A,x,H,G,null)}}const O=b.children;for(let H=0,U=O.length;H<U;H++)v(O[H],A,x,T,P)}function E(b){b.target.removeEventListener("dispose",E);for(const x in l){const T=l[x],P=b.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function dv(r,e){function t(){let N=!1;const ce=new ct;let j=null;const le=new ct(0,0,0,0);return{setMask:function(pe){j!==pe&&!N&&(r.colorMask(pe,pe,pe,pe),j=pe)},setLocked:function(pe){N=pe},setClear:function(pe,te,Re,Me,ft){ft===!0&&(pe*=Me,te*=Me,Re*=Me),ce.set(pe,te,Re,Me),le.equals(ce)===!1&&(r.clearColor(pe,te,Re,Me),le.copy(ce))},reset:function(){N=!1,j=null,le.set(-1,0,0,0)}}}function n(){let N=!1,ce=!1,j=null,le=null,pe=null;return{setReversed:function(te){if(ce!==te){const Re=e.get("EXT_clip_control");te?Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.ZERO_TO_ONE_EXT):Re.clipControlEXT(Re.LOWER_LEFT_EXT,Re.NEGATIVE_ONE_TO_ONE_EXT),ce=te;const Me=pe;pe=null,this.setClear(Me)}},getReversed:function(){return ce},setTest:function(te){te?Q(r.DEPTH_TEST):xe(r.DEPTH_TEST)},setMask:function(te){j!==te&&!N&&(r.depthMask(te),j=te)},setFunc:function(te){if(ce&&(te=Hf[te]),le!==te){switch(te){case go:r.depthFunc(r.NEVER);break;case _o:r.depthFunc(r.ALWAYS);break;case xo:r.depthFunc(r.LESS);break;case zs:r.depthFunc(r.LEQUAL);break;case vo:r.depthFunc(r.EQUAL);break;case So:r.depthFunc(r.GEQUAL);break;case yo:r.depthFunc(r.GREATER);break;case Mo:r.depthFunc(r.NOTEQUAL);break;default:r.depthFunc(r.LEQUAL)}le=te}},setLocked:function(te){N=te},setClear:function(te){pe!==te&&(pe=te,ce&&(te=1-te),r.clearDepth(te))},reset:function(){N=!1,j=null,le=null,pe=null,ce=!1}}}function i(){let N=!1,ce=null,j=null,le=null,pe=null,te=null,Re=null,Me=null,ft=null;return{setTest:function(et){N||(et?Q(r.STENCIL_TEST):xe(r.STENCIL_TEST))},setMask:function(et){ce!==et&&!N&&(r.stencilMask(et),ce=et)},setFunc:function(et,dn,wn){(j!==et||le!==dn||pe!==wn)&&(r.stencilFunc(et,dn,wn),j=et,le=dn,pe=wn)},setOp:function(et,dn,wn){(te!==et||Re!==dn||Me!==wn)&&(r.stencilOp(et,dn,wn),te=et,Re=dn,Me=wn)},setLocked:function(et){N=et},setClear:function(et){ft!==et&&(r.clearStencil(et),ft=et)},reset:function(){N=!1,ce=null,j=null,le=null,pe=null,te=null,Re=null,Me=null,ft=null}}}const s=new t,a=new n,o=new i,c=new WeakMap,l=new WeakMap;let h={},d={},u={},f=new WeakMap,g=[],y=null,m=!1,p=null,M=null,C=null,v=null,E=null,b=null,A=null,x=new Ce(0,0,0),T=0,P=!1,D=null,O=null,H=null,U=null,G=null;const Z=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let X=!1,ie=0;const K=r.getParameter(r.VERSION);K.indexOf("WebGL")!==-1?(ie=parseFloat(/^WebGL (\d)/.exec(K)[1]),X=ie>=1):K.indexOf("OpenGL ES")!==-1&&(ie=parseFloat(/^OpenGL ES (\d)/.exec(K)[1]),X=ie>=2);let ee=null,ne={};const Le=r.getParameter(r.SCISSOR_BOX),Ae=r.getParameter(r.VIEWPORT),dt=new ct().fromArray(Le),Ye=new ct().fromArray(Ae);function Je(N,ce,j,le){const pe=new Uint8Array(4),te=r.createTexture();r.bindTexture(N,te),r.texParameteri(N,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(N,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let Re=0;Re<j;Re++)N===r.TEXTURE_3D||N===r.TEXTURE_2D_ARRAY?r.texImage3D(ce,0,r.RGBA,1,1,le,0,r.RGBA,r.UNSIGNED_BYTE,pe):r.texImage2D(ce+Re,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,pe);return te}const $={};$[r.TEXTURE_2D]=Je(r.TEXTURE_2D,r.TEXTURE_2D,1),$[r.TEXTURE_CUBE_MAP]=Je(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),$[r.TEXTURE_2D_ARRAY]=Je(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),$[r.TEXTURE_3D]=Je(r.TEXTURE_3D,r.TEXTURE_3D,1,1),s.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(r.DEPTH_TEST),a.setFunc(zs),$e(!1),_t(gl),Q(r.CULL_FACE),je(Qn);function Q(N){h[N]!==!0&&(r.enable(N),h[N]=!0)}function xe(N){h[N]!==!1&&(r.disable(N),h[N]=!1)}function Ue(N,ce){return u[N]!==ce?(r.bindFramebuffer(N,ce),u[N]=ce,N===r.DRAW_FRAMEBUFFER&&(u[r.FRAMEBUFFER]=ce),N===r.FRAMEBUFFER&&(u[r.DRAW_FRAMEBUFFER]=ce),!0):!1}function ge(N,ce){let j=g,le=!1;if(N){j=f.get(ce),j===void 0&&(j=[],f.set(ce,j));const pe=N.textures;if(j.length!==pe.length||j[0]!==r.COLOR_ATTACHMENT0){for(let te=0,Re=pe.length;te<Re;te++)j[te]=r.COLOR_ATTACHMENT0+te;j.length=pe.length,le=!0}}else j[0]!==r.BACK&&(j[0]=r.BACK,le=!0);le&&r.drawBuffers(j)}function He(N){return y!==N?(r.useProgram(N),y=N,!0):!1}const Tt={[es]:r.FUNC_ADD,[af]:r.FUNC_SUBTRACT,[of]:r.FUNC_REVERSE_SUBTRACT};Tt[cf]=r.MIN,Tt[lf]=r.MAX;const We={[hf]:r.ZERO,[df]:r.ONE,[uf]:r.SRC_COLOR,[od]:r.SRC_ALPHA,[xf]:r.SRC_ALPHA_SATURATE,[gf]:r.DST_COLOR,[pf]:r.DST_ALPHA,[ff]:r.ONE_MINUS_SRC_COLOR,[cd]:r.ONE_MINUS_SRC_ALPHA,[_f]:r.ONE_MINUS_DST_COLOR,[mf]:r.ONE_MINUS_DST_ALPHA,[vf]:r.CONSTANT_COLOR,[Sf]:r.ONE_MINUS_CONSTANT_COLOR,[yf]:r.CONSTANT_ALPHA,[Mf]:r.ONE_MINUS_CONSTANT_ALPHA};function je(N,ce,j,le,pe,te,Re,Me,ft,et){if(N===Qn){m===!0&&(xe(r.BLEND),m=!1);return}if(m===!1&&(Q(r.BLEND),m=!0),N!==rf){if(N!==p||et!==P){if((M!==es||E!==es)&&(r.blendEquation(r.FUNC_ADD),M=es,E=es),et)switch(N){case Fs:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _l:r.blendFunc(r.ONE,r.ONE);break;case xl:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case vl:r.blendFuncSeparate(r.DST_COLOR,r.ONE_MINUS_SRC_ALPHA,r.ZERO,r.ONE);break;default:Fe("WebGLState: Invalid blending: ",N);break}else switch(N){case Fs:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case _l:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE,r.ONE,r.ONE);break;case xl:Fe("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case vl:Fe("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Fe("WebGLState: Invalid blending: ",N);break}C=null,v=null,b=null,A=null,x.set(0,0,0),T=0,p=N,P=et}return}pe=pe||ce,te=te||j,Re=Re||le,(ce!==M||pe!==E)&&(r.blendEquationSeparate(Tt[ce],Tt[pe]),M=ce,E=pe),(j!==C||le!==v||te!==b||Re!==A)&&(r.blendFuncSeparate(We[j],We[le],We[te],We[Re]),C=j,v=le,b=te,A=Re),(Me.equals(x)===!1||ft!==T)&&(r.blendColor(Me.r,Me.g,Me.b,ft),x.copy(Me),T=ft),p=N,P=!1}function ut(N,ce){N.side===Dn?xe(r.CULL_FACE):Q(r.CULL_FACE);let j=N.side===$t;ce&&(j=!j),$e(j),N.blending===Fs&&N.transparent===!1?je(Qn):je(N.blending,N.blendEquation,N.blendSrc,N.blendDst,N.blendEquationAlpha,N.blendSrcAlpha,N.blendDstAlpha,N.blendColor,N.blendAlpha,N.premultipliedAlpha),a.setFunc(N.depthFunc),a.setTest(N.depthTest),a.setMask(N.depthWrite),s.setMask(N.colorWrite);const le=N.stencilWrite;o.setTest(le),le&&(o.setMask(N.stencilWriteMask),o.setFunc(N.stencilFunc,N.stencilRef,N.stencilFuncMask),o.setOp(N.stencilFail,N.stencilZFail,N.stencilZPass)),Kt(N.polygonOffset,N.polygonOffsetFactor,N.polygonOffsetUnits),N.alphaToCoverage===!0?Q(r.SAMPLE_ALPHA_TO_COVERAGE):xe(r.SAMPLE_ALPHA_TO_COVERAGE)}function $e(N){D!==N&&(N?r.frontFace(r.CW):r.frontFace(r.CCW),D=N)}function _t(N){N!==nf?(Q(r.CULL_FACE),N!==O&&(N===gl?r.cullFace(r.BACK):N===sf?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):xe(r.CULL_FACE),O=N}function Dt(N){N!==H&&(X&&r.lineWidth(N),H=N)}function Kt(N,ce,j){N?(Q(r.POLYGON_OFFSET_FILL),(U!==ce||G!==j)&&(U=ce,G=j,a.getReversed()&&(ce=-ce),r.polygonOffset(ce,j))):xe(r.POLYGON_OFFSET_FILL)}function xt(N){N?Q(r.SCISSOR_TEST):xe(r.SCISSOR_TEST)}function Mt(N){N===void 0&&(N=r.TEXTURE0+Z-1),ee!==N&&(r.activeTexture(N),ee=N)}function F(N,ce,j){j===void 0&&(ee===null?j=r.TEXTURE0+Z-1:j=ee);let le=ne[j];le===void 0&&(le={type:void 0,texture:void 0},ne[j]=le),(le.type!==N||le.texture!==ce)&&(ee!==j&&(r.activeTexture(j),ee=j),r.bindTexture(N,ce||$[N]),le.type=N,le.texture=ce)}function kt(){const N=ne[ee];N!==void 0&&N.type!==void 0&&(r.bindTexture(N.type,null),N.type=void 0,N.texture=void 0)}function it(){try{r.compressedTexImage2D(...arguments)}catch(N){Fe("WebGLState:",N)}}function R(){try{r.compressedTexImage3D(...arguments)}catch(N){Fe("WebGLState:",N)}}function _(){try{r.texSubImage2D(...arguments)}catch(N){Fe("WebGLState:",N)}}function B(){try{r.texSubImage3D(...arguments)}catch(N){Fe("WebGLState:",N)}}function V(){try{r.compressedTexSubImage2D(...arguments)}catch(N){Fe("WebGLState:",N)}}function q(){try{r.compressedTexSubImage3D(...arguments)}catch(N){Fe("WebGLState:",N)}}function se(){try{r.texStorage2D(...arguments)}catch(N){Fe("WebGLState:",N)}}function re(){try{r.texStorage3D(...arguments)}catch(N){Fe("WebGLState:",N)}}function Y(){try{r.texImage2D(...arguments)}catch(N){Fe("WebGLState:",N)}}function J(){try{r.texImage3D(...arguments)}catch(N){Fe("WebGLState:",N)}}function ae(N){return d[N]!==void 0?d[N]:r.getParameter(N)}function be(N,ce){d[N]!==ce&&(r.pixelStorei(N,ce),d[N]=ce)}function he(N){dt.equals(N)===!1&&(r.scissor(N.x,N.y,N.z,N.w),dt.copy(N))}function oe(N){Ye.equals(N)===!1&&(r.viewport(N.x,N.y,N.z,N.w),Ye.copy(N))}function Te(N,ce){let j=l.get(ce);j===void 0&&(j=new WeakMap,l.set(ce,j));let le=j.get(N);le===void 0&&(le=r.getUniformBlockIndex(ce,N.name),j.set(N,le))}function De(N,ce){const le=l.get(ce).get(N);c.get(ce)!==le&&(r.uniformBlockBinding(ce,le,N.__bindingPointIndex),c.set(ce,le))}function Be(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),a.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),r.pixelStorei(r.PACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_ALIGNMENT,4),r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,!1),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,r.BROWSER_DEFAULT_WEBGL),r.pixelStorei(r.PACK_ROW_LENGTH,0),r.pixelStorei(r.PACK_SKIP_PIXELS,0),r.pixelStorei(r.PACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_ROW_LENGTH,0),r.pixelStorei(r.UNPACK_IMAGE_HEIGHT,0),r.pixelStorei(r.UNPACK_SKIP_PIXELS,0),r.pixelStorei(r.UNPACK_SKIP_ROWS,0),r.pixelStorei(r.UNPACK_SKIP_IMAGES,0),h={},d={},ee=null,ne={},u={},f=new WeakMap,g=[],y=null,m=!1,p=null,M=null,C=null,v=null,E=null,b=null,A=null,x=new Ce(0,0,0),T=0,P=!1,D=null,O=null,H=null,U=null,G=null,dt.set(0,0,r.canvas.width,r.canvas.height),Ye.set(0,0,r.canvas.width,r.canvas.height),s.reset(),a.reset(),o.reset()}return{buffers:{color:s,depth:a,stencil:o},enable:Q,disable:xe,bindFramebuffer:Ue,drawBuffers:ge,useProgram:He,setBlending:je,setMaterial:ut,setFlipSided:$e,setCullFace:_t,setLineWidth:Dt,setPolygonOffset:Kt,setScissorTest:xt,activeTexture:Mt,bindTexture:F,unbindTexture:kt,compressedTexImage2D:it,compressedTexImage3D:R,texImage2D:Y,texImage3D:J,pixelStorei:be,getParameter:ae,updateUBOMapping:Te,uniformBlockBinding:De,texStorage2D:se,texStorage3D:re,texSubImage2D:_,texSubImage3D:B,compressedTexSubImage2D:V,compressedTexSubImage3D:q,scissor:he,viewport:oe,reset:Be}}function uv(r,e,t,n,i,s,a){const o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new Ne,h=new WeakMap,d=new Set;let u;const f=new WeakMap;let g=!1;try{g=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function y(R,_){return g?new OffscreenCanvas(R,_):qs("canvas")}function m(R,_,B){let V=1;const q=it(R);if((q.width>B||q.height>B)&&(V=B/Math.max(q.width,q.height)),V<1)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap||typeof VideoFrame<"u"&&R instanceof VideoFrame){const se=Math.floor(V*q.width),re=Math.floor(V*q.height);u===void 0&&(u=y(se,re));const Y=_?y(se,re):u;return Y.width=se,Y.height=re,Y.getContext("2d").drawImage(R,0,0,se,re),we("WebGLRenderer: Texture has been resized from ("+q.width+"x"+q.height+") to ("+se+"x"+re+")."),Y}else return"data"in R&&we("WebGLRenderer: Image in DataTexture is too big ("+q.width+"x"+q.height+")."),R;return R}function p(R){return R.generateMipmaps}function M(R){r.generateMipmap(R)}function C(R){return R.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:R.isWebGL3DRenderTarget?r.TEXTURE_3D:R.isWebGLArrayRenderTarget||R.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function v(R,_,B,V,q,se=!1){if(R!==null){if(r[R]!==void 0)return r[R];we("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let re;V&&(re=e.get("EXT_texture_norm16"),re||we("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let Y=_;if(_===r.RED&&(B===r.FLOAT&&(Y=r.R32F),B===r.HALF_FLOAT&&(Y=r.R16F),B===r.UNSIGNED_BYTE&&(Y=r.R8),B===r.UNSIGNED_SHORT&&re&&(Y=re.R16_EXT),B===r.SHORT&&re&&(Y=re.R16_SNORM_EXT)),_===r.RED_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.R8UI),B===r.UNSIGNED_SHORT&&(Y=r.R16UI),B===r.UNSIGNED_INT&&(Y=r.R32UI),B===r.BYTE&&(Y=r.R8I),B===r.SHORT&&(Y=r.R16I),B===r.INT&&(Y=r.R32I)),_===r.RG&&(B===r.FLOAT&&(Y=r.RG32F),B===r.HALF_FLOAT&&(Y=r.RG16F),B===r.UNSIGNED_BYTE&&(Y=r.RG8),B===r.UNSIGNED_SHORT&&re&&(Y=re.RG16_EXT),B===r.SHORT&&re&&(Y=re.RG16_SNORM_EXT)),_===r.RG_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.RG8UI),B===r.UNSIGNED_SHORT&&(Y=r.RG16UI),B===r.UNSIGNED_INT&&(Y=r.RG32UI),B===r.BYTE&&(Y=r.RG8I),B===r.SHORT&&(Y=r.RG16I),B===r.INT&&(Y=r.RG32I)),_===r.RGB_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.RGB8UI),B===r.UNSIGNED_SHORT&&(Y=r.RGB16UI),B===r.UNSIGNED_INT&&(Y=r.RGB32UI),B===r.BYTE&&(Y=r.RGB8I),B===r.SHORT&&(Y=r.RGB16I),B===r.INT&&(Y=r.RGB32I)),_===r.RGBA_INTEGER&&(B===r.UNSIGNED_BYTE&&(Y=r.RGBA8UI),B===r.UNSIGNED_SHORT&&(Y=r.RGBA16UI),B===r.UNSIGNED_INT&&(Y=r.RGBA32UI),B===r.BYTE&&(Y=r.RGBA8I),B===r.SHORT&&(Y=r.RGBA16I),B===r.INT&&(Y=r.RGBA32I)),_===r.RGB&&(B===r.UNSIGNED_SHORT&&re&&(Y=re.RGB16_EXT),B===r.SHORT&&re&&(Y=re.RGB16_SNORM_EXT),B===r.UNSIGNED_INT_5_9_9_9_REV&&(Y=r.RGB9_E5),B===r.UNSIGNED_INT_10F_11F_11F_REV&&(Y=r.R11F_G11F_B10F)),_===r.RGBA){const J=se?jr:qe.getTransfer(q);B===r.FLOAT&&(Y=r.RGBA32F),B===r.HALF_FLOAT&&(Y=r.RGBA16F),B===r.UNSIGNED_BYTE&&(Y=J===rt?r.SRGB8_ALPHA8:r.RGBA8),B===r.UNSIGNED_SHORT&&re&&(Y=re.RGBA16_EXT),B===r.SHORT&&re&&(Y=re.RGBA16_SNORM_EXT),B===r.UNSIGNED_SHORT_4_4_4_4&&(Y=r.RGBA4),B===r.UNSIGNED_SHORT_5_5_5_1&&(Y=r.RGB5_A1)}return(Y===r.R16F||Y===r.R32F||Y===r.RG16F||Y===r.RG32F||Y===r.RGBA16F||Y===r.RGBA32F)&&e.get("EXT_color_buffer_float"),Y}function E(R,_){let B;return R?_===null||_===On||_===Hs?B=r.DEPTH24_STENCIL8:_===on?B=r.DEPTH32F_STENCIL8:_===Gs&&(B=r.DEPTH24_STENCIL8,we("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===On||_===Hs?B=r.DEPTH_COMPONENT24:_===on?B=r.DEPTH_COMPONENT32F:_===Gs&&(B=r.DEPTH_COMPONENT16),B}function b(R,_){return p(R)===!0||R.isFramebufferTexture&&R.minFilter!==At&&R.minFilter!==Rt?Math.log2(Math.max(_.width,_.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?_.mipmaps.length:1}function A(R){const _=R.target;_.removeEventListener("dispose",A),T(_),_.isVideoTexture&&h.delete(_),_.isHTMLTexture&&d.delete(_)}function x(R){const _=R.target;_.removeEventListener("dispose",x),D(_)}function T(R){const _=n.get(R);if(_.__webglInit===void 0)return;const B=R.source,V=f.get(B);if(V){const q=V[_.__cacheKey];q.usedTimes--,q.usedTimes===0&&P(R),Object.keys(V).length===0&&f.delete(B)}n.remove(R)}function P(R){const _=n.get(R);r.deleteTexture(_.__webglTexture);const B=R.source,V=f.get(B);delete V[_.__cacheKey],a.memory.textures--}function D(R){const _=n.get(R);if(R.depthTexture&&(R.depthTexture.dispose(),n.remove(R.depthTexture)),R.isWebGLCubeRenderTarget)for(let V=0;V<6;V++){if(Array.isArray(_.__webglFramebuffer[V]))for(let q=0;q<_.__webglFramebuffer[V].length;q++)r.deleteFramebuffer(_.__webglFramebuffer[V][q]);else r.deleteFramebuffer(_.__webglFramebuffer[V]);_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer[V])}else{if(Array.isArray(_.__webglFramebuffer))for(let V=0;V<_.__webglFramebuffer.length;V++)r.deleteFramebuffer(_.__webglFramebuffer[V]);else r.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&r.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&r.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let V=0;V<_.__webglColorRenderbuffer.length;V++)_.__webglColorRenderbuffer[V]&&r.deleteRenderbuffer(_.__webglColorRenderbuffer[V]);_.__webglDepthRenderbuffer&&r.deleteRenderbuffer(_.__webglDepthRenderbuffer)}const B=R.textures;for(let V=0,q=B.length;V<q;V++){const se=n.get(B[V]);se.__webglTexture&&(r.deleteTexture(se.__webglTexture),a.memory.textures--),n.remove(B[V])}n.remove(R)}let O=0;function H(){O=0}function U(){return O}function G(R){O=R}function Z(){const R=O;return R>=i.maxTextures&&we("WebGLTextures: Trying to use "+(R+1)+" texture units while this GPU supports only "+i.maxTextures),O+=1,R}function X(R){const _=[];return _.push(R.wrapS),_.push(R.wrapT),_.push(R.wrapR||0),_.push(R.magFilter),_.push(R.minFilter),_.push(R.anisotropy),_.push(R.internalFormat),_.push(R.format),_.push(R.type),_.push(R.generateMipmaps),_.push(R.premultiplyAlpha),_.push(R.flipY),_.push(R.unpackAlignment),_.push(R.colorSpace),_.join()}function ie(R,_){const B=n.get(R);if(R.isVideoTexture&&F(R),R.isRenderTargetTexture===!1&&R.isExternalTexture!==!0&&R.version>0&&B.__version!==R.version){const V=R.image;if(V===null)we("WebGLRenderer: Texture marked for update but no image data found.");else if(V.complete===!1)we("WebGLRenderer: Texture marked for update but image is incomplete");else{xe(B,R,_);return}}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D,B.__webglTexture,r.TEXTURE0+_)}function K(R,_){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){xe(B,R,_);return}else R.isExternalTexture&&(B.__webglTexture=R.sourceTexture?R.sourceTexture:null);t.bindTexture(r.TEXTURE_2D_ARRAY,B.__webglTexture,r.TEXTURE0+_)}function ee(R,_){const B=n.get(R);if(R.isRenderTargetTexture===!1&&R.version>0&&B.__version!==R.version){xe(B,R,_);return}t.bindTexture(r.TEXTURE_3D,B.__webglTexture,r.TEXTURE0+_)}function ne(R,_){const B=n.get(R);if(R.isCubeDepthTexture!==!0&&R.version>0&&B.__version!==R.version){Ue(B,R,_);return}t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+_)}const Le={[cs]:r.REPEAT,[Nn]:r.CLAMP_TO_EDGE,[Kr]:r.MIRRORED_REPEAT},Ae={[At]:r.NEAREST,[xd]:r.NEAREST_MIPMAP_NEAREST,[Ds]:r.NEAREST_MIPMAP_LINEAR,[Rt]:r.LINEAR,[Br]:r.LINEAR_MIPMAP_NEAREST,[Zn]:r.LINEAR_MIPMAP_LINEAR},dt={[Lf]:r.NEVER,[Of]:r.ALWAYS,[Df]:r.LESS,[Ac]:r.LEQUAL,[Nf]:r.EQUAL,[Rc]:r.GEQUAL,[Ff]:r.GREATER,[Uf]:r.NOTEQUAL};function Ye(R,_){if(_.type===on&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Rt||_.magFilter===Br||_.magFilter===Ds||_.magFilter===Zn||_.minFilter===Rt||_.minFilter===Br||_.minFilter===Ds||_.minFilter===Zn)&&we("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(R,r.TEXTURE_WRAP_S,Le[_.wrapS]),r.texParameteri(R,r.TEXTURE_WRAP_T,Le[_.wrapT]),(R===r.TEXTURE_3D||R===r.TEXTURE_2D_ARRAY)&&r.texParameteri(R,r.TEXTURE_WRAP_R,Le[_.wrapR]),r.texParameteri(R,r.TEXTURE_MAG_FILTER,Ae[_.magFilter]),r.texParameteri(R,r.TEXTURE_MIN_FILTER,Ae[_.minFilter]),_.compareFunction&&(r.texParameteri(R,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(R,r.TEXTURE_COMPARE_FUNC,dt[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===At||_.minFilter!==Ds&&_.minFilter!==Zn||_.type===on&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||n.get(_).__currentAnisotropy){const B=e.get("EXT_texture_filter_anisotropic");r.texParameterf(R,B.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,i.getMaxAnisotropy())),n.get(_).__currentAnisotropy=_.anisotropy}}}function Je(R,_){let B=!1;R.__webglInit===void 0&&(R.__webglInit=!0,_.addEventListener("dispose",A));const V=_.source;let q=f.get(V);q===void 0&&(q={},f.set(V,q));const se=X(_);if(se!==R.__cacheKey){q[se]===void 0&&(q[se]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,B=!0),q[se].usedTimes++;const re=q[R.__cacheKey];re!==void 0&&(q[R.__cacheKey].usedTimes--,re.usedTimes===0&&P(_)),R.__cacheKey=se,R.__webglTexture=q[se].texture}return B}function $(R,_,B){return Math.floor(Math.floor(R/B)/_)}function Q(R,_,B,V){const se=R.updateRanges;if(se.length===0)t.texSubImage2D(r.TEXTURE_2D,0,0,0,_.width,_.height,B,V,_.data);else{se.sort((be,he)=>be.start-he.start);let re=0;for(let be=1;be<se.length;be++){const he=se[re],oe=se[be],Te=he.start+he.count,De=$(oe.start,_.width,4),Be=$(he.start,_.width,4);oe.start<=Te+1&&De===Be&&$(oe.start+oe.count-1,_.width,4)===De?he.count=Math.max(he.count,oe.start+oe.count-he.start):(++re,se[re]=oe)}se.length=re+1;const Y=t.getParameter(r.UNPACK_ROW_LENGTH),J=t.getParameter(r.UNPACK_SKIP_PIXELS),ae=t.getParameter(r.UNPACK_SKIP_ROWS);t.pixelStorei(r.UNPACK_ROW_LENGTH,_.width);for(let be=0,he=se.length;be<he;be++){const oe=se[be],Te=Math.floor(oe.start/4),De=Math.ceil(oe.count/4),Be=Te%_.width,N=Math.floor(Te/_.width),ce=De,j=1;t.pixelStorei(r.UNPACK_SKIP_PIXELS,Be),t.pixelStorei(r.UNPACK_SKIP_ROWS,N),t.texSubImage2D(r.TEXTURE_2D,0,Be,N,ce,j,B,V,_.data)}R.clearUpdateRanges(),t.pixelStorei(r.UNPACK_ROW_LENGTH,Y),t.pixelStorei(r.UNPACK_SKIP_PIXELS,J),t.pixelStorei(r.UNPACK_SKIP_ROWS,ae)}}function xe(R,_,B){let V=r.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(V=r.TEXTURE_2D_ARRAY),_.isData3DTexture&&(V=r.TEXTURE_3D);const q=Je(R,_),se=_.source;t.bindTexture(V,R.__webglTexture,r.TEXTURE0+B);const re=n.get(se);if(se.version!==re.__version||q===!0){if(t.activeTexture(r.TEXTURE0+B),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){const j=qe.getPrimaries(qe.workingColorSpace),le=_.colorSpace===pi?null:qe.getPrimaries(_.colorSpace),pe=_.colorSpace===pi||j===le?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,pe)}t.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment);let J=m(_.image,!1,i.maxTextureSize);J=kt(_,J);const ae=s.convert(_.format,_.colorSpace),be=s.convert(_.type);let he=v(_.internalFormat,ae,be,_.normalized,_.colorSpace,_.isVideoTexture);Ye(V,_);let oe;const Te=_.mipmaps,De=_.isVideoTexture!==!0,Be=re.__version===void 0||q===!0,N=se.dataReady,ce=b(_,J);if(_.isDepthTexture)he=E(_.format===Ai,_.type),Be&&(De?t.texStorage2D(r.TEXTURE_2D,1,he,J.width,J.height):t.texImage2D(r.TEXTURE_2D,0,he,J.width,J.height,0,ae,be,null));else if(_.isDataTexture)if(Te.length>0){De&&Be&&t.texStorage2D(r.TEXTURE_2D,ce,he,Te[0].width,Te[0].height);for(let j=0,le=Te.length;j<le;j++)oe=Te[j],De?N&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,oe.width,oe.height,ae,be,oe.data):t.texImage2D(r.TEXTURE_2D,j,he,oe.width,oe.height,0,ae,be,oe.data);_.generateMipmaps=!1}else De?(Be&&t.texStorage2D(r.TEXTURE_2D,ce,he,J.width,J.height),N&&Q(_,J,ae,be)):t.texImage2D(r.TEXTURE_2D,0,he,J.width,J.height,0,ae,be,J.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){De&&Be&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ce,he,Te[0].width,Te[0].height,J.depth);for(let j=0,le=Te.length;j<le;j++)if(oe=Te[j],_.format!==cn)if(ae!==null)if(De){if(N)if(_.layerUpdates.size>0){const pe=dh(oe.width,oe.height,_.format,_.type);for(const te of _.layerUpdates){const Re=oe.data.subarray(te*pe/oe.data.BYTES_PER_ELEMENT,(te+1)*pe/oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,te,oe.width,oe.height,1,ae,Re)}}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,J.depth,ae,oe.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,j,he,oe.width,oe.height,J.depth,0,oe.data,0,0);else we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else De?N&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,j,0,0,0,oe.width,oe.height,J.depth,ae,be,oe.data):t.texImage3D(r.TEXTURE_2D_ARRAY,j,he,oe.width,oe.height,J.depth,0,ae,be,oe.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{De&&Be&&t.texStorage2D(r.TEXTURE_2D,ce,he,Te[0].width,Te[0].height);for(let j=0,le=Te.length;j<le;j++)oe=Te[j],_.format!==cn?ae!==null?De?N&&t.compressedTexSubImage2D(r.TEXTURE_2D,j,0,0,oe.width,oe.height,ae,oe.data):t.compressedTexImage2D(r.TEXTURE_2D,j,he,oe.width,oe.height,0,oe.data):we("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):De?N&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,oe.width,oe.height,ae,be,oe.data):t.texImage2D(r.TEXTURE_2D,j,he,oe.width,oe.height,0,ae,be,oe.data)}else if(_.isDataArrayTexture)if(De){if(Be&&t.texStorage3D(r.TEXTURE_2D_ARRAY,ce,he,J.width,J.height,J.depth),N)if(_.layerUpdates.size>0){const j=dh(J.width,J.height,_.format,_.type);for(const le of _.layerUpdates){const pe=J.data.subarray(le*j/J.data.BYTES_PER_ELEMENT,(le+1)*j/J.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,le,J.width,J.height,1,ae,be,pe)}_.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,J.width,J.height,J.depth,ae,be,J.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,he,J.width,J.height,J.depth,0,ae,be,J.data);else if(_.isData3DTexture)De?(Be&&t.texStorage3D(r.TEXTURE_3D,ce,he,J.width,J.height,J.depth),N&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,J.width,J.height,J.depth,ae,be,J.data)):t.texImage3D(r.TEXTURE_3D,0,he,J.width,J.height,J.depth,0,ae,be,J.data);else if(_.isFramebufferTexture){if(Be)if(De)t.texStorage2D(r.TEXTURE_2D,ce,he,J.width,J.height);else{let j=J.width,le=J.height;for(let pe=0;pe<ce;pe++)t.texImage2D(r.TEXTURE_2D,pe,he,j,le,0,ae,be,null),j>>=1,le>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in r){const j=r.canvas;if(j.hasAttribute("layoutsubtree")||j.setAttribute("layoutsubtree","true"),J.parentNode!==j){j.appendChild(J),d.add(_),j.onpaint=le=>{const pe=le.changedElements;for(const te of d)pe.includes(te.image)&&(te.needsUpdate=!0)},j.requestPaint();return}if(r.texElementImage2D.length===3)r.texElementImage2D(r.TEXTURE_2D,r.RGBA8,J);else{const pe=r.RGBA,te=r.RGBA,Re=r.UNSIGNED_BYTE;r.texElementImage2D(r.TEXTURE_2D,0,pe,te,Re,J)}r.texParameteri(r.TEXTURE_2D,r.TEXTURE_MIN_FILTER,r.LINEAR),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_S,r.CLAMP_TO_EDGE),r.texParameteri(r.TEXTURE_2D,r.TEXTURE_WRAP_T,r.CLAMP_TO_EDGE)}}else if(Te.length>0){if(De&&Be){const j=it(Te[0]);t.texStorage2D(r.TEXTURE_2D,ce,he,j.width,j.height)}for(let j=0,le=Te.length;j<le;j++)oe=Te[j],De?N&&t.texSubImage2D(r.TEXTURE_2D,j,0,0,ae,be,oe):t.texImage2D(r.TEXTURE_2D,j,he,ae,be,oe);_.generateMipmaps=!1}else if(De){if(Be){const j=it(J);t.texStorage2D(r.TEXTURE_2D,ce,he,j.width,j.height)}N&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,ae,be,J)}else t.texImage2D(r.TEXTURE_2D,0,he,ae,be,J);p(_)&&M(V),re.__version=se.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function Ue(R,_,B){if(_.image.length!==6)return;const V=Je(R,_),q=_.source;t.bindTexture(r.TEXTURE_CUBE_MAP,R.__webglTexture,r.TEXTURE0+B);const se=n.get(q);if(q.version!==se.__version||V===!0){t.activeTexture(r.TEXTURE0+B);const re=qe.getPrimaries(qe.workingColorSpace),Y=_.colorSpace===pi?null:qe.getPrimaries(_.colorSpace),J=_.colorSpace===pi||re===Y?r.NONE:r.BROWSER_DEFAULT_WEBGL;t.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(r.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,J);const ae=_.isCompressedTexture||_.image[0].isCompressedTexture,be=_.image[0]&&_.image[0].isDataTexture,he=[];for(let te=0;te<6;te++)!ae&&!be?he[te]=m(_.image[te],!0,i.maxCubemapSize):he[te]=be?_.image[te].image:_.image[te],he[te]=kt(_,he[te]);const oe=he[0],Te=s.convert(_.format,_.colorSpace),De=s.convert(_.type),Be=v(_.internalFormat,Te,De,_.normalized,_.colorSpace),N=_.isVideoTexture!==!0,ce=se.__version===void 0||V===!0,j=q.dataReady;let le=b(_,oe);Ye(r.TEXTURE_CUBE_MAP,_);let pe;if(ae){N&&ce&&t.texStorage2D(r.TEXTURE_CUBE_MAP,le,Be,oe.width,oe.height);for(let te=0;te<6;te++){pe=he[te].mipmaps;for(let Re=0;Re<pe.length;Re++){const Me=pe[Re];_.format!==cn?Te!==null?N?j&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,0,0,Me.width,Me.height,Te,Me.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,Be,Me.width,Me.height,0,Me.data):we("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):N?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,0,0,Me.width,Me.height,Te,De,Me.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re,Be,Me.width,Me.height,0,Te,De,Me.data)}}}else{if(pe=_.mipmaps,N&&ce){pe.length>0&&le++;const te=it(he[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,le,Be,te.width,te.height)}for(let te=0;te<6;te++)if(be){N?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,he[te].width,he[te].height,Te,De,he[te].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,he[te].width,he[te].height,0,Te,De,he[te].data);for(let Re=0;Re<pe.length;Re++){const ft=pe[Re].image[te].image;N?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,0,0,ft.width,ft.height,Te,De,ft.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,Be,ft.width,ft.height,0,Te,De,ft.data)}}else{N?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,0,0,Te,De,he[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,0,Be,Te,De,he[te]);for(let Re=0;Re<pe.length;Re++){const Me=pe[Re];N?j&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,0,0,Te,De,Me.image[te]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+te,Re+1,Be,Te,De,Me.image[te])}}}p(_)&&M(r.TEXTURE_CUBE_MAP),se.__version=q.version,_.onUpdate&&_.onUpdate(_)}R.__version=_.version}function ge(R,_,B,V,q,se){const re=s.convert(B.format,B.colorSpace),Y=s.convert(B.type),J=v(B.internalFormat,re,Y,B.normalized,B.colorSpace),ae=n.get(_),be=n.get(B);if(be.__renderTarget=_,!ae.__hasExternalTextures){const he=Math.max(1,_.width>>se),oe=Math.max(1,_.height>>se);q===r.TEXTURE_3D||q===r.TEXTURE_2D_ARRAY?t.texImage3D(q,se,J,he,oe,_.depth,0,re,Y,null):t.texImage2D(q,se,J,he,oe,0,re,Y,null)}t.bindFramebuffer(r.FRAMEBUFFER,R),Mt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,V,q,be.__webglTexture,0,xt(_)):(q===r.TEXTURE_2D||q>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&q<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,V,q,be.__webglTexture,se),t.bindFramebuffer(r.FRAMEBUFFER,null)}function He(R,_,B){if(r.bindRenderbuffer(r.RENDERBUFFER,R),_.depthBuffer){const V=_.depthTexture,q=V&&V.isDepthTexture?V.type:null,se=E(_.stencilBuffer,q),re=_.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;Mt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xt(_),se,_.width,_.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,xt(_),se,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,se,_.width,_.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,re,r.RENDERBUFFER,R)}else{const V=_.textures;for(let q=0;q<V.length;q++){const se=V[q],re=s.convert(se.format,se.colorSpace),Y=s.convert(se.type),J=v(se.internalFormat,re,Y,se.normalized,se.colorSpace);Mt(_)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,xt(_),J,_.width,_.height):B?r.renderbufferStorageMultisample(r.RENDERBUFFER,xt(_),J,_.width,_.height):r.renderbufferStorage(r.RENDERBUFFER,J,_.width,_.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function Tt(R,_,B){const V=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(r.FRAMEBUFFER,R),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");const q=n.get(_.depthTexture);if(q.__renderTarget=_,(!q.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),V){if(q.__webglInit===void 0&&(q.__webglInit=!0,_.depthTexture.addEventListener("dispose",A)),q.__webglTexture===void 0){q.__webglTexture=r.createTexture(),t.bindTexture(r.TEXTURE_CUBE_MAP,q.__webglTexture),Ye(r.TEXTURE_CUBE_MAP,_.depthTexture);const ae=s.convert(_.depthTexture.format),be=s.convert(_.depthTexture.type);let he;_.depthTexture.format===ti?he=r.DEPTH_COMPONENT24:_.depthTexture.format===Ai&&(he=r.DEPTH24_STENCIL8);for(let oe=0;oe<6;oe++)r.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+oe,0,he,_.width,_.height,0,ae,be,null)}}else ie(_.depthTexture,0);const se=q.__webglTexture,re=xt(_),Y=V?r.TEXTURE_CUBE_MAP_POSITIVE_X+B:r.TEXTURE_2D,J=_.depthTexture.format===Ai?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;if(_.depthTexture.format===ti)Mt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,Y,se,0,re):r.framebufferTexture2D(r.FRAMEBUFFER,J,Y,se,0);else if(_.depthTexture.format===Ai)Mt(_)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,J,Y,se,0,re):r.framebufferTexture2D(r.FRAMEBUFFER,J,Y,se,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function We(R){const _=n.get(R),B=R.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==R.depthTexture){const V=R.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),V){const q=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,V.removeEventListener("dispose",q)};V.addEventListener("dispose",q),_.__depthDisposeCallback=q}_.__boundDepthTexture=V}if(R.depthTexture&&!_.__autoAllocateDepthBuffer)if(B)for(let V=0;V<6;V++)Tt(_.__webglFramebuffer[V],R,V);else{const V=R.texture.mipmaps;V&&V.length>0?Tt(_.__webglFramebuffer[0],R,0):Tt(_.__webglFramebuffer,R,0)}else if(B){_.__webglDepthbuffer=[];for(let V=0;V<6;V++)if(t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[V]),_.__webglDepthbuffer[V]===void 0)_.__webglDepthbuffer[V]=r.createRenderbuffer(),He(_.__webglDepthbuffer[V],R,!1);else{const q=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,se=_.__webglDepthbuffer[V];r.bindRenderbuffer(r.RENDERBUFFER,se),r.framebufferRenderbuffer(r.FRAMEBUFFER,q,r.RENDERBUFFER,se)}}else{const V=R.texture.mipmaps;if(V&&V.length>0?t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(r.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=r.createRenderbuffer(),He(_.__webglDepthbuffer,R,!1);else{const q=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,se=_.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,se),r.framebufferRenderbuffer(r.FRAMEBUFFER,q,r.RENDERBUFFER,se)}}t.bindFramebuffer(r.FRAMEBUFFER,null)}function je(R,_,B){const V=n.get(R);_!==void 0&&ge(V.__webglFramebuffer,R,R.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),B!==void 0&&We(R)}function ut(R){const _=R.texture,B=n.get(R),V=n.get(_);R.addEventListener("dispose",x);const q=R.textures,se=R.isWebGLCubeRenderTarget===!0,re=q.length>1;if(re||(V.__webglTexture===void 0&&(V.__webglTexture=r.createTexture()),V.__version=_.version,a.memory.textures++),se){B.__webglFramebuffer=[];for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer[Y]=[];for(let J=0;J<_.mipmaps.length;J++)B.__webglFramebuffer[Y][J]=r.createFramebuffer()}else B.__webglFramebuffer[Y]=r.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){B.__webglFramebuffer=[];for(let Y=0;Y<_.mipmaps.length;Y++)B.__webglFramebuffer[Y]=r.createFramebuffer()}else B.__webglFramebuffer=r.createFramebuffer();if(re)for(let Y=0,J=q.length;Y<J;Y++){const ae=n.get(q[Y]);ae.__webglTexture===void 0&&(ae.__webglTexture=r.createTexture(),a.memory.textures++)}if(R.samples>0&&Mt(R)===!1){B.__webglMultisampledFramebuffer=r.createFramebuffer(),B.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,B.__webglMultisampledFramebuffer);for(let Y=0;Y<q.length;Y++){const J=q[Y];B.__webglColorRenderbuffer[Y]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,B.__webglColorRenderbuffer[Y]);const ae=s.convert(J.format,J.colorSpace),be=s.convert(J.type),he=v(J.internalFormat,ae,be,J.normalized,J.colorSpace,R.isXRRenderTarget===!0),oe=xt(R);r.renderbufferStorageMultisample(r.RENDERBUFFER,oe,he,R.width,R.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+Y,r.RENDERBUFFER,B.__webglColorRenderbuffer[Y])}r.bindRenderbuffer(r.RENDERBUFFER,null),R.depthBuffer&&(B.__webglDepthRenderbuffer=r.createRenderbuffer(),He(B.__webglDepthRenderbuffer,R,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(se){t.bindTexture(r.TEXTURE_CUBE_MAP,V.__webglTexture),Ye(r.TEXTURE_CUBE_MAP,_);for(let Y=0;Y<6;Y++)if(_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)ge(B.__webglFramebuffer[Y][J],R,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,J);else ge(B.__webglFramebuffer[Y],R,_,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+Y,0);p(_)&&M(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(re){for(let Y=0,J=q.length;Y<J;Y++){const ae=q[Y],be=n.get(ae);let he=r.TEXTURE_2D;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(he=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(he,be.__webglTexture),Ye(he,ae),ge(B.__webglFramebuffer,R,ae,r.COLOR_ATTACHMENT0+Y,he,0),p(ae)&&M(he)}t.unbindTexture()}else{let Y=r.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(Y=R.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(Y,V.__webglTexture),Ye(Y,_),_.mipmaps&&_.mipmaps.length>0)for(let J=0;J<_.mipmaps.length;J++)ge(B.__webglFramebuffer[J],R,_,r.COLOR_ATTACHMENT0,Y,J);else ge(B.__webglFramebuffer,R,_,r.COLOR_ATTACHMENT0,Y,0);p(_)&&M(Y),t.unbindTexture()}R.depthBuffer&&We(R)}function $e(R){const _=R.textures;for(let B=0,V=_.length;B<V;B++){const q=_[B];if(p(q)){const se=C(R),re=n.get(q).__webglTexture;t.bindTexture(se,re),M(se),t.unbindTexture()}}}const _t=[],Dt=[];function Kt(R){if(R.samples>0){if(Mt(R)===!1){const _=R.textures,B=R.width,V=R.height;let q=r.COLOR_BUFFER_BIT;const se=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,re=n.get(R),Y=_.length>1;if(Y)for(let ae=0;ae<_.length;ae++)t.bindFramebuffer(r.FRAMEBUFFER,re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,re.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,re.__webglMultisampledFramebuffer);const J=R.texture.mipmaps;J&&J.length>0?t.bindFramebuffer(r.DRAW_FRAMEBUFFER,re.__webglFramebuffer[0]):t.bindFramebuffer(r.DRAW_FRAMEBUFFER,re.__webglFramebuffer);for(let ae=0;ae<_.length;ae++){if(R.resolveDepthBuffer&&(R.depthBuffer&&(q|=r.DEPTH_BUFFER_BIT),R.stencilBuffer&&R.resolveStencilBuffer&&(q|=r.STENCIL_BUFFER_BIT)),Y){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const be=n.get(_[ae]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,be,0)}r.blitFramebuffer(0,0,B,V,0,0,B,V,q,r.NEAREST),c===!0&&(_t.length=0,Dt.length=0,_t.push(r.COLOR_ATTACHMENT0+ae),R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&(_t.push(se),Dt.push(se),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Dt)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),Y)for(let ae=0;ae<_.length;ae++){t.bindFramebuffer(r.FRAMEBUFFER,re.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.RENDERBUFFER,re.__webglColorRenderbuffer[ae]);const be=n.get(_[ae]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,re.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+ae,r.TEXTURE_2D,be,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,re.__webglMultisampledFramebuffer)}else if(R.depthBuffer&&R.storeMultisampledDepthBuffer===!1&&c){const _=R.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[_])}}}function xt(R){return Math.min(i.maxSamples,R.samples)}function Mt(R){const _=n.get(R);return R.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function F(R){const _=a.render.frame;h.get(R)!==_&&(h.set(R,_),R.update())}function kt(R,_){const B=R.colorSpace,V=R.format,q=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||B!==tn&&B!==pi&&(qe.getTransfer(B)===rt?(V!==cn||q!==Qt)&&we("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Fe("WebGLTextures: Unsupported texture color space:",B)),_}function it(R){return typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement?(l.width=R.naturalWidth||R.width,l.height=R.naturalHeight||R.height):typeof VideoFrame<"u"&&R instanceof VideoFrame?(l.width=R.displayWidth,l.height=R.displayHeight):(l.width=R.width,l.height=R.height),l}this.allocateTextureUnit=Z,this.resetTextureUnits=H,this.getTextureUnits=U,this.setTextureUnits=G,this.setTexture2D=ie,this.setTexture2DArray=K,this.setTexture3D=ee,this.setTextureCube=ne,this.rebindTextures=je,this.setupRenderTarget=ut,this.updateRenderTargetMipmap=$e,this.updateMultisampleRenderTarget=Kt,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Mt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function fv(r,e){function t(n,i=pi){let s;const a=qe.getTransfer(i);if(n===Qt)return r.UNSIGNED_BYTE;if(n===Sc)return r.UNSIGNED_SHORT_4_4_4_4;if(n===yc)return r.UNSIGNED_SHORT_5_5_5_1;if(n===yd)return r.UNSIGNED_INT_5_9_9_9_REV;if(n===Md)return r.UNSIGNED_INT_10F_11F_11F_REV;if(n===vd)return r.BYTE;if(n===Sd)return r.SHORT;if(n===Gs)return r.UNSIGNED_SHORT;if(n===vc)return r.INT;if(n===On)return r.UNSIGNED_INT;if(n===on)return r.FLOAT;if(n===Bn)return r.HALF_FLOAT;if(n===Ed)return r.ALPHA;if(n===bd)return r.RGB;if(n===cn)return r.RGBA;if(n===ti)return r.DEPTH_COMPONENT;if(n===Ai)return r.DEPTH_STENCIL;if(n===Mc)return r.RED;if(n===Ec)return r.RED_INTEGER;if(n===Ii)return r.RG;if(n===bc)return r.RG_INTEGER;if(n===Tc)return r.RGBA_INTEGER;if(n===kr||n===zr||n===Gr||n===Hr)if(a===rt)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(n===kr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Hr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(n===kr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===zr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Gr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Hr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Eo||n===bo||n===To||n===wo)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(n===Eo)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===bo)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===To)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===wo)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Ao||n===Ro||n===Co||n===Po||n===Io||n===$r||n===Lo)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(n===Ao||n===Ro)return a===rt?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(n===Co)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC;if(n===Po)return s.COMPRESSED_R11_EAC;if(n===Io)return s.COMPRESSED_SIGNED_R11_EAC;if(n===$r)return s.COMPRESSED_RG11_EAC;if(n===Lo)return s.COMPRESSED_SIGNED_RG11_EAC}else return null;if(n===Do||n===No||n===Fo||n===Uo||n===Oo||n===Bo||n===ko||n===zo||n===Go||n===Ho||n===Vo||n===Wo||n===Xo||n===qo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(n===Do)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===No)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Uo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Oo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Bo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===ko)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Go)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Ho)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Vo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Wo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===Xo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===qo)return a===rt?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Ko||n===$o||n===Yo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(n===Ko)return a===rt?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===$o)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Yo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Zo||n===jo||n===Yr||n===Jo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(n===Zo)return s.COMPRESSED_RED_RGTC1_EXT;if(n===jo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Yr)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===Jo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Hs?r.UNSIGNED_INT_24_8:r[n]!==void 0?r[n]:null}return{convert:t}}const pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,mv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class gv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new zd(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new kn({vertexShader:pv,fragmentShader:mv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Pe(new En(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class _v extends vi{constructor(e,t){super();const n=this;let i=null,s=1,a=null,o="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const y=typeof XRWebGLBinding<"u",m=new gv,p={},M=t.getContextAttributes();let C=null,v=null;const E=[],b=[],A=new Ne;let x=null,T=null;const P=new qt;P.viewport=new ct;const D=new qt;D.viewport=new ct;const O=[P,D],H=new dm;let U=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function($){let Q=E[$];return Q===void 0&&(Q=new Aa,E[$]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function($){let Q=E[$];return Q===void 0&&(Q=new Aa,E[$]=Q),Q.getGripSpace()},this.getHand=function($){let Q=E[$];return Q===void 0&&(Q=new Aa,E[$]=Q),Q.getHandSpace()};function Z($){const Q=b.indexOf($.inputSource);if(Q===-1)return;const xe=E[Q];xe!==void 0&&(xe.update($.inputSource,$.frame,l||a),xe.dispatchEvent({type:$.type,data:$.inputSource}))}function X(){i.removeEventListener("select",Z),i.removeEventListener("selectstart",Z),i.removeEventListener("selectend",Z),i.removeEventListener("squeeze",Z),i.removeEventListener("squeezestart",Z),i.removeEventListener("squeezeend",Z),i.removeEventListener("end",X),i.removeEventListener("inputsourceschange",ie);for(let $=0;$<E.length;$++){const Q=b[$];Q!==null&&(b[$]=null,E[$].disconnect(Q))}U=null,G=null,m.reset();for(const $ in p)delete p[$];if(e.setRenderTarget(C),f=null,u=null,d=null,i=null,v=null,Je.stop(),n.isPresenting=!1,e.setPixelRatio(x),e.setSize(A.width,A.height,!1),T!==null){const $=T.camera;$.fov=T.fov,$.zoom=T.zoom,$.updateProjectionMatrix(),T=null}n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function($){s=$,n.isPresenting===!0&&we("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function($){o=$,n.isPresenting===!0&&we("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function($){l=$},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d===null&&y&&(d=new XRWebGLBinding(i,t)),d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function($){if(i=$,i!==null){if(C=e.getRenderTarget(),i.addEventListener("select",Z),i.addEventListener("selectstart",Z),i.addEventListener("selectend",Z),i.addEventListener("squeeze",Z),i.addEventListener("squeezestart",Z),i.addEventListener("squeezeend",Z),i.addEventListener("end",X),i.addEventListener("inputsourceschange",ie),M.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(A),y&&"createProjectionLayer"in XRWebGLBinding.prototype){let xe=null,Ue=null,ge=null;M.depth&&(ge=M.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,xe=M.stencil?Ai:ti,Ue=M.stencil?Hs:On);const He={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:s};d=this.getBinding(),u=d.createProjectionLayer(He),i.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),v=new yn(u.textureWidth,u.textureHeight,{format:cn,type:Qt,depthTexture:new $s(u.textureWidth,u.textureHeight,Ue,void 0,void 0,void 0,void 0,void 0,void 0,xe),stencilBuffer:M.stencil,colorSpace:e.outputColorSpace,samples:M.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{const xe={antialias:M.antialias,alpha:!0,depth:M.depth,stencil:M.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(i,t,xe),i.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new yn(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:M.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Je.setContext(i),Je.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function ie($){for(let Q=0;Q<$.removed.length;Q++){const xe=$.removed[Q],Ue=b.indexOf(xe);Ue>=0&&(b[Ue]=null,E[Ue].disconnect(xe))}for(let Q=0;Q<$.added.length;Q++){const xe=$.added[Q];let Ue=b.indexOf(xe);if(Ue===-1){for(let He=0;He<E.length;He++)if(He>=b.length){b.push(xe),Ue=He;break}else if(b[He]===null){b[He]=xe,Ue=He;break}if(Ue===-1)break}const ge=E[Ue];ge&&ge.connect(xe)}}const K=new I,ee=new I;function ne($,Q,xe){K.setFromMatrixPosition(Q.matrixWorld),ee.setFromMatrixPosition(xe.matrixWorld);const Ue=K.distanceTo(ee),ge=Q.projectionMatrix.elements,He=xe.projectionMatrix.elements,Tt=ge[14]/(ge[10]-1),We=ge[14]/(ge[10]+1),je=(ge[9]+1)/ge[5],ut=(ge[9]-1)/ge[5],$e=(ge[8]-1)/ge[0],_t=(He[8]+1)/He[0],Dt=Tt*$e,Kt=Tt*_t,xt=Ue/(-$e+_t),Mt=xt*-$e;if(Q.matrixWorld.decompose($.position,$.quaternion,$.scale),$.translateX(Mt),$.translateZ(xt),$.matrixWorld.compose($.position,$.quaternion,$.scale),$.matrixWorldInverse.copy($.matrixWorld).invert(),ge[10]===-1)$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{const F=Tt+xt,kt=We+xt,it=Dt-Mt,R=Kt+(Ue-Mt),_=je*We/kt*F,B=ut*We/kt*F;$.projectionMatrix.makePerspective(it,R,_,B,F,kt),$.projectionMatrixInverse.copy($.projectionMatrix).invert()}}function Le($,Q){Q===null?$.matrixWorld.copy($.matrix):$.matrixWorld.multiplyMatrices(Q.matrixWorld,$.matrix),$.matrixWorldInverse.copy($.matrixWorld).invert()}this.updateCamera=function($){if(i===null)return;let Q=$.near,xe=$.far;m.texture!==null&&(m.depthNear>0&&(Q=m.depthNear),m.depthFar>0&&(xe=m.depthFar)),H.near=D.near=P.near=Q,H.far=D.far=P.far=xe,(U!==H.near||G!==H.far)&&(i.updateRenderState({depthNear:H.near,depthFar:H.far}),U=H.near,G=H.far),H.layers.mask=$.layers.mask|6,P.layers.mask=H.layers.mask&-5,D.layers.mask=H.layers.mask&-3;const Ue=$.parent,ge=H.cameras;Le(H,Ue);for(let He=0;He<ge.length;He++)Le(ge[He],Ue);ge.length===2?ne(H,P,D):H.projectionMatrix.copy(P.projectionMatrix),T===null&&$.isPerspectiveCamera&&(T={camera:$,fov:$.fov,zoom:$.zoom}),Ae($,H,Ue)};function Ae($,Q,xe){xe===null?$.matrix.copy(Q.matrixWorld):($.matrix.copy(xe.matrixWorld),$.matrix.invert(),$.matrix.multiply(Q.matrixWorld)),$.matrix.decompose($.position,$.quaternion,$.scale),$.updateMatrixWorld(!0),$.projectionMatrix.copy(Q.projectionMatrix),$.projectionMatrixInverse.copy(Q.projectionMatrixInverse),$.isPerspectiveCamera&&($.fov=ls*2*Math.atan(1/$.projectionMatrix.elements[5]),$.zoom=1)}this.getCamera=function(){return H},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function($){c=$,u!==null&&(u.fixedFoveation=$),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=$)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(H)},this.getCameraTexture=function($){return p[$]};let dt=null;function Ye($,Q){if(h=Q.getViewerPose(l||a),g=Q,h!==null){const xe=h.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let Ue=!1;xe.length!==H.cameras.length&&(H.cameras.length=0,Ue=!0);for(let We=0;We<xe.length;We++){const je=xe[We];let ut=null;if(f!==null)ut=f.getViewport(je);else{const _t=d.getViewSubImage(u,je);ut=_t.viewport,We===0&&(e.setRenderTargetTextures(v,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(v))}let $e=O[We];$e===void 0&&($e=new qt,$e.layers.enable(We),$e.viewport=new ct,O[We]=$e),$e.matrix.fromArray(je.transform.matrix),$e.matrix.decompose($e.position,$e.quaternion,$e.scale),$e.projectionMatrix.fromArray(je.projectionMatrix),$e.projectionMatrixInverse.copy($e.projectionMatrix).invert(),$e.viewport.set(ut.x,ut.y,ut.width,ut.height),We===0&&(H.matrix.copy($e.matrix),H.matrix.decompose(H.position,H.quaternion,H.scale)),Ue===!0&&H.cameras.push($e)}const ge=i.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&y){d=n.getBinding();const We=d.getDepthInformation(xe[0]);We&&We.isValid&&We.texture&&m.init(We,i.renderState)}if(ge&&ge.includes("camera-access")&&y){e.state.unbindTexture(),d=n.getBinding();for(let We=0;We<xe.length;We++){const je=xe[We].camera;if(je){let ut=p[je];ut||(ut=new zd,p[je]=ut);const $e=d.getCameraImage(je);ut.sourceTexture=$e}}}}for(let xe=0;xe<E.length;xe++){const Ue=b[xe],ge=E[xe];Ue!==null&&ge!==void 0&&ge.update(Ue,Q,l||a)}dt&&dt($,Q),Q.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:Q}),g=null}const Je=new $d;Je.setAnimationLoop(Ye),this.setAnimationLoop=function($){dt=$},this.dispose=function(){}}}const xv=new ke,tu=new Oe;tu.set(-1,0,0,0,1,0,0,0,1);function vv(r,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Gd(r)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,M,C,v){p.isNodeMaterial?p.uniformsNeedUpdate=!1:p.isMeshBasicMaterial?s(m,p):p.isMeshLambertMaterial?(s(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshToonMaterial?(s(m,p),d(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)):p.isMeshStandardMaterial?(s(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,v)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),y(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(a(m,p),p.isLineDashedMaterial&&o(m,p)):p.isPointsMaterial?c(m,p,M,C):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===$t&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===$t&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const M=e.get(p),C=M.envMap,v=M.envMapRotation;C&&(m.envMap.value=C,m.envMapRotation.value.setFromMatrix4(xv.makeRotationFromEuler(v)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&m.envMapRotation.value.premultiply(tu),m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function a(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function o(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,M,C){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*M,m.scale.value=C*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,M){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===$t&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.retroreflectivity>0&&(m.retroreflectivity.value=p.retroreflectivity),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=M.texture,m.transmissionSamplerSize.value.set(M.width,M.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function y(m,p){const M=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(M.matrixWorld),m.nearDistance.value=M.shadow.camera.near,m.farDistance.value=M.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Sv(r,e,t,n){let i={},s={},a=[];const o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function c(v,E){const b=E.program;n.uniformBlockBinding(v,b)}function l(v,E){let b=i[v.id];b===void 0&&(m(v),b=h(v),i[v.id]=b,v.addEventListener("dispose",M));const A=E.program;n.updateUBOMapping(v,A);const x=e.render.frame;s[v.id]!==x&&(u(v),s[v.id]=x)}function h(v){const E=d();v.__bindingPointIndex=E;const b=r.createBuffer(),A=v.__size,x=v.usage;return r.bindBuffer(r.UNIFORM_BUFFER,b),r.bufferData(r.UNIFORM_BUFFER,A,x),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,E,b),b}function d(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return Fe("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(v){const E=i[v.id],b=v.uniforms,A=v.__cache;r.bindBuffer(r.UNIFORM_BUFFER,E);for(let x=0,T=b.length;x<T;x++){const P=b[x];if(Array.isArray(P))for(let D=0,O=P.length;D<O;D++)f(P[D],x,D,A);else f(P,x,0,A)}r.bindBuffer(r.UNIFORM_BUFFER,null)}function f(v,E,b,A){if(y(v,E,b,A)===!0){const x=v.__offset,T=v.value;if(Array.isArray(T)){let P=0;for(let D=0;D<T.length;D++){const O=T[D],H=p(O);g(O,v.__data,P),typeof O!="number"&&typeof O!="boolean"&&!O.isMatrix3&&!ArrayBuffer.isView(O)&&(P+=H.storage/Float32Array.BYTES_PER_ELEMENT)}}else g(T,v.__data,0);r.bufferSubData(r.UNIFORM_BUFFER,x,v.__data)}}function g(v,E,b){typeof v=="number"||typeof v=="boolean"?E[0]=v:v.isMatrix3?(E[0]=v.elements[0],E[1]=v.elements[1],E[2]=v.elements[2],E[3]=0,E[4]=v.elements[3],E[5]=v.elements[4],E[6]=v.elements[5],E[7]=0,E[8]=v.elements[6],E[9]=v.elements[7],E[10]=v.elements[8],E[11]=0):ArrayBuffer.isView(v)?E.set(new v.constructor(v.buffer,v.byteOffset,E.length)):v.toArray(E,b)}function y(v,E,b,A){const x=v.value,T=E+"_"+b;if(A[T]===void 0)return typeof x=="number"||typeof x=="boolean"?A[T]=x:ArrayBuffer.isView(x)?A[T]=x.slice():A[T]=x.clone(),!0;{const P=A[T];if(typeof x=="number"||typeof x=="boolean"){if(P!==x)return A[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(P.equals(x)===!1)return P.copy(x),!0}}return!1}function m(v){const E=v.uniforms;let b=0;const A=16;for(let T=0,P=E.length;T<P;T++){const D=Array.isArray(E[T])?E[T]:[E[T]];for(let O=0,H=D.length;O<H;O++){const U=D[O],G=Array.isArray(U.value)?U.value:[U.value];for(let Z=0,X=G.length;Z<X;Z++){const ie=G[Z],K=p(ie),ee=b%A,ne=ee%K.boundary,Le=ee+ne;b+=ne,Le!==0&&A-Le<K.storage&&(b+=A-Le),U.__data=new Float32Array(K.storage/Float32Array.BYTES_PER_ELEMENT),U.__offset=b,b+=K.storage}}}const x=b%A;return x>0&&(b+=A-x),v.__size=b,v.__cache={},this}function p(v){const E={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(E.boundary=4,E.storage=4):v.isVector2?(E.boundary=8,E.storage=8):v.isVector3||v.isColor?(E.boundary=16,E.storage=12):v.isVector4?(E.boundary=16,E.storage=16):v.isMatrix3?(E.boundary=48,E.storage=48):v.isMatrix4?(E.boundary=64,E.storage=64):v.isTexture?we("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(E.boundary=16,E.storage=v.byteLength):we("WebGLRenderer: Unsupported uniform value type.",v),E}function M(v){const E=v.target;E.removeEventListener("dispose",M);const b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),r.deleteBuffer(i[E.id]),delete i[E.id],delete s[E.id]}function C(){for(const v in i)r.deleteBuffer(i[v]);a=[],i={},s={}}return{bind:c,update:l,dispose:C}}const yv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]);let Cn=null;function Mv(){return Cn===null&&(Cn=new Dc(yv,16,16,Ii,Bn),Cn.name="DFG_LUT",Cn.minFilter=Rt,Cn.magFilter=Rt,Cn.wrapS=Nn,Cn.wrapT=Nn,Cn.generateMipmaps=!1,Cn.needsUpdate=!0),Cn}class Ev{constructor(e={}){const{canvas:t=zf(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:u=!1,outputBufferType:f=Qt}=e;this.isWebGLRenderer=!0;let g;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");g=n.getContextAttributes().alpha}else g=a;const y=f,m=new Set([Tc,bc,Ec]),p=new Set([Qt,On,Gs,Hs,Sc,yc]),M=new Uint32Array(4),C=new Int32Array(4),v=new I;let E=null,b=null;const A=[],x=[];let T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const P=this;let D=!1,O=null,H=null,U=null,G=null;this._outputColorSpace=Ut;let Z=0,X=0,ie=null,K=-1,ee=null;const ne=new ct,Le=new ct;let Ae=null;const dt=new Ce(0);let Ye=0,Je=t.width,$=t.height,Q=1,xe=null,Ue=null;const ge=new ct(0,0,Je,$),He=new ct(0,0,Je,$);let Tt=!1;const We=new Fc;let je=!1,ut=!1;const $e=new ke,_t=new I,Dt=new ct,Kt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let xt=!1;function Mt(){return ie===null?Q:1}let F=n;function kt(S,L){return t.getContext(S,L)}let it,R,_,B,V,q,se,re,Y,J,ae,be,he,oe,Te,De,Be,N,ce,j,le,pe,te;try{const S={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xc}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",et,!1),t.addEventListener("webglcontextcreationerror",dn,!1),F===null){const L="webgl2";if(F=kt(L,S),F===null)throw kt(L)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Re()}catch(S){throw t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",et,!1),t.removeEventListener("webglcontextcreationerror",dn,!1),Fe("WebGLRenderer: "+S.message),S}function Re(){it=new M0(F),it.init(),le=new fv(F,it),R=new u0(F,it,e,le),_=new dv(F,it),R.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),H=F.createFramebuffer(),U=F.createFramebuffer(),G=F.createFramebuffer(),B=new T0(F),V=new jx,q=new uv(F,it,_,V,R,le,B),se=new y0(P),re=new Am(F),pe=new h0(F,re),Y=new E0(F,re,B,pe),J=new A0(F,Y,re,pe,B),N=new w0(F,R,q),Te=new f0(V),ae=new Zx(P,se,it,R,pe,Te),be=new vv(P,V),he=new Qx,oe=new rv(it),Be=new l0(P,se,_,J,g,c),De=new hv(P,J,R),te=new Sv(F,B,R,_),ce=new d0(F,it,B),j=new b0(F,it,B),B.programs=ae.programs,P.capabilities=R,P.extensions=it,P.properties=V,P.renderLists=he,P.shadowMap=De,P.state=_,P.info=B}y!==Qt&&(T=new C0(y,t.width,t.height,o,i,s));const Me=new _v(P,F);this.xr=Me,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const S=it.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){const S=it.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(S){S!==void 0&&(Q=S,this.setSize(Je,$,!1))},this.getSize=function(S){return S.set(Je,$)},this.setSize=function(S,L,W=!0){if(Me.isPresenting){we("WebGLRenderer: Can't change size while VR device is presenting.");return}Je=S,$=L,t.width=Math.floor(S*Q),t.height=Math.floor(L*Q),W===!0&&(t.style.width=S+"px",t.style.height=L+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,L)},this.getDrawingBufferSize=function(S){return S.set(Je*Q,$*Q).floor()},this.setDrawingBufferSize=function(S,L,W){Je=S,$=L,Q=W,t.width=Math.floor(S*W),t.height=Math.floor(L*W),this.setViewport(0,0,S,L)},this.setEffects=function(S){if(y===Qt){Fe("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let L=0;L<S.length;L++)if(S[L].isOutputPass===!0){we("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ne)},this.getViewport=function(S){return S.copy(ge)},this.setViewport=function(S,L,W,k){S.isVector4?ge.set(S.x,S.y,S.z,S.w):ge.set(S,L,W,k),_.viewport(ne.copy(ge).multiplyScalar(Q).round())},this.getScissor=function(S){return S.copy(He)},this.setScissor=function(S,L,W,k){S.isVector4?He.set(S.x,S.y,S.z,S.w):He.set(S,L,W,k),_.scissor(Le.copy(He).multiplyScalar(Q).round())},this.getScissorTest=function(){return Tt},this.setScissorTest=function(S){_.setScissorTest(Tt=S)},this.setOpaqueSort=function(S){xe=S},this.setTransparentSort=function(S){Ue=S},this.getClearColor=function(S){return S.copy(Be.getClearColor())},this.setClearColor=function(){Be.setClearColor(...arguments)},this.getClearAlpha=function(){return Be.getClearAlpha()},this.setClearAlpha=function(){Be.setClearAlpha(...arguments)},this.clear=function(S=!0,L=!0,W=!0){let k=0;if(S){let z=!1;if(ie!==null){const fe=ie.texture.format;z=m.has(fe)}if(z){const fe=ie.texture.type,_e=p.has(fe),ue=Be.getClearColor(),Se=Be.getClearAlpha(),Ee=ue.r,ze=ue.g,Xe=ue.b;_e?(M[0]=Ee,M[1]=ze,M[2]=Xe,M[3]=Se,F.clearBufferuiv(F.COLOR,0,M)):(C[0]=Ee,C[1]=ze,C[2]=Xe,C[3]=Se,F.clearBufferiv(F.COLOR,0,C))}else k|=F.COLOR_BUFFER_BIT}L&&(k|=F.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),W&&(k|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),k!==0&&F.clear(k)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),O=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",et,!1),t.removeEventListener("webglcontextcreationerror",dn,!1),Be.dispose(),he.dispose(),oe.dispose(),V.dispose(),se.dispose(),J.dispose(),pe.dispose(),te.dispose(),ae.dispose(),Me.dispose(),Me.removeEventListener("sessionstart",il),Me.removeEventListener("sessionend",sl),Si.stop()};function ft(S){S.preventDefault(),Jr("WebGLRenderer: Context Lost."),D=!0}function et(){Jr("WebGLRenderer: Context Restored."),D=!1;const S=B.autoReset,L=De.enabled,W=De.autoUpdate,k=De.needsUpdate,z=De.type;Re(),B.autoReset=S,De.enabled=L,De.autoUpdate=W,De.needsUpdate=k,De.type=z}function dn(S){Fe("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function wn(S){const L=S.target;L.removeEventListener("dispose",wn),du(L)}function du(S){uu(S),V.remove(S)}function uu(S){const L=V.get(S).programs;L!==void 0&&(L.forEach(function(W){ae.releaseProgram(W)}),S.isShaderMaterial&&ae.releaseShaderCache(S))}this.renderBufferDirect=function(S,L,W,k,z,fe){L===null&&(L=Kt);const _e=z.isMesh&&z.matrixWorld.determinantAffine()<0,ue=mu(S,L,W,k,z);_.setMaterial(k,_e);let Se=W.index,Ee=1;if(k.wireframe===!0){if(Se=Y.getWireframeAttribute(W),Se===void 0)return;Ee=2}const ze=W.drawRange,Xe=W.attributes.position;let ye=ze.start*Ee,tt=(ze.start+ze.count)*Ee;fe!==null&&(ye=Math.max(ye,fe.start*Ee),tt=Math.min(tt,(fe.start+fe.count)*Ee)),Se!==null?(ye=Math.max(ye,0),tt=Math.min(tt,Se.count)):Xe!=null&&(ye=Math.max(ye,0),tt=Math.min(tt,Xe.count));const Et=tt-ye;if(Et<0||Et===1/0)return;pe.setup(z,k,ue,W,Se);let gt,ht=ce;if(Se!==null&&(gt=re.get(Se),ht=j,ht.setIndex(gt)),z.isMesh)k.wireframe===!0?(_.setLineWidth(k.wireframeLinewidth*Mt()),ht.setMode(F.LINES)):ht.setMode(F.TRIANGLES);else if(z.isLine){let zt=k.linewidth;zt===void 0&&(zt=1),_.setLineWidth(zt*Mt()),z.isLineSegments?ht.setMode(F.LINES):z.isLineLoop?ht.setMode(F.LINE_LOOP):ht.setMode(F.LINE_STRIP)}else z.isPoints?ht.setMode(F.POINTS):z.isSprite&&ht.setMode(F.TRIANGLES);if(z.isBatchedMesh)if(it.get("WEBGL_multi_draw"))ht.renderMultiDraw(z._multiDrawStarts,z._multiDrawCounts,z._multiDrawCount);else{const zt=z._multiDrawStarts,me=z._multiDrawCounts,Vt=z._multiDrawCount,Ze=Se?re.get(Se).bytesPerElement:1,nn=V.get(k).currentProgram.getUniforms();for(let An=0;An<Vt;An++)nn.setValue(F,"_gl_DrawID",An),ht.render(zt[An]/Ze,me[An])}else if(z.isInstancedMesh)ht.renderInstances(ye,Et,z.count);else if(W.isInstancedBufferGeometry){const zt=W._maxInstanceCount!==void 0?W._maxInstanceCount:1/0,me=Math.min(W.instanceCount,zt);ht.renderInstances(ye,Et,me)}else ht.render(ye,Et)};function nl(S,L,W,k){O!==null&&S.isNodeMaterial&&O.setObject(k,S),je===!0&&Te.setState(S,W,!1),S.transparent===!0&&S.side===Dn&&S.forceSinglePass===!1?(S.side=$t,S.needsUpdate=!0,ir(S,L,k),S.side=_i,S.needsUpdate=!0,ir(S,L,k),S.side=Dn):ir(S,L,k)}this.compile=function(S,L,W=null){W===null&&(W=S),O!==null&&O.renderStart(S,L,W),b=oe.get(W),b.init(L),x.push(b),W.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),S!==W&&S.traverseVisible(function(z){z.isLight&&z.layers.test(L.layers)&&(b.pushLight(z),z.castShadow&&b.pushShadow(z))}),b.setupLights(),O!==null&&O.updateLights(b.state.lightsArray),ut=this.localClippingEnabled,je=Te.init(this.clippingPlanes,ut),je===!0&&Te.setGlobalState(this.clippingPlanes,L),O!==null&&De.render(b.state.shadowsArray,W,L);const k=new Set;return S.traverse(function(z){if(!(z.isMesh||z.isPoints||z.isLine||z.isSprite))return;const fe=z.material;if(fe)if(Array.isArray(fe))for(let _e=0;_e<fe.length;_e++){const ue=fe[_e];nl(ue,W,L,z),k.add(ue)}else nl(fe,W,L,z),k.add(fe)}),b=x.pop(),O!==null&&O.renderEnd(),k},this.compileAsync=function(S,L,W=null){const k=this.compile(S,L,W);return new Promise(z=>{function fe(){if(k.forEach(function(_e){const Se=V.get(_e).currentProgram;(Se===void 0||Se.isReady())&&k.delete(_e)}),k.size===0){z(S);return}setTimeout(fe,10)}it.get("KHR_parallel_shader_compile")!==null?fe():setTimeout(fe,10)})};let ma=null;function fu(S){ma&&ma(S)}function il(){Si.stop()}function sl(){Si.start()}const Si=new $d;Si.setAnimationLoop(fu),typeof self<"u"&&Si.setContext(self),this.setAnimationLoop=function(S){ma=S,Me.setAnimationLoop(S),S===null?Si.stop():Si.start()},Me.addEventListener("sessionstart",il),Me.addEventListener("sessionend",sl),this.render=function(S,L){if(L!==void 0&&L.isCamera!==!0){Fe("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(D===!0)return;O!==null&&O.renderStart(S,L);const W=Me.enabled===!0&&Me.isPresenting===!0,k=T!==null&&(ie===null||W)&&T.begin(P,ie);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),L.parent===null&&L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),Me.enabled===!0&&Me.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Me.cameraAutoUpdate===!0&&Me.updateCamera(L),L=Me.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,L,ie),b=oe.get(S,x.length),b.init(L),b.state.textureUnits=q.getTextureUnits(),x.push(b),$e.multiplyMatrices(L.projectionMatrix,L.matrixWorldInverse),We.setFromProjectionMatrix($e,Fn,L.reversedDepth),ut=this.localClippingEnabled,je=Te.init(this.clippingPlanes,ut),E=he.get(S,A.length),E.init(),A.push(E),Me.enabled===!0&&Me.isPresenting===!0){const _e=P.xr.getDepthSensingMesh();_e!==null&&ga(_e,L,-1/0,P.sortObjects)}ga(S,L,0,P.sortObjects),E.finish(),O!==null&&O.updateLights(b.state.lightsArray),P.sortObjects===!0&&E.sort(xe,Ue),xt=Me.enabled===!1||Me.isPresenting===!1||Me.hasDepthSensing()===!1,xt&&Be.addToRenderList(E,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),je===!0&&Te.beginShadows();const z=b.state.shadowsArray;if(De.render(z,S,L),je===!0&&Te.endShadows(),(k&&T.hasRenderPass())===!1){const _e=E.opaque,ue=E.transmissive;if(b.setupLights(),L.isArrayCamera){const Se=L.cameras;if(ue.length>0)for(let Ee=0,ze=Se.length;Ee<ze;Ee++){const Xe=Se[Ee];al(_e,ue,S,Xe)}xt&&Be.render(S);for(let Ee=0,ze=Se.length;Ee<ze;Ee++){const Xe=Se[Ee];rl(E,S,Xe,Xe.viewport)}}else ue.length>0&&al(_e,ue,S,L),xt&&Be.render(S),rl(E,S,L)}ie!==null&&X===0&&(q.updateMultisampleRenderTarget(ie),q.updateRenderTargetMipmap(ie)),k&&T.end(P),S.isScene===!0&&S.onAfterRender(P,S,L),pe.resetDefaultState(),K=-1,ee=null,x.pop(),x.length>0?(b=x[x.length-1],q.setTextureUnits(b.state.textureUnits),je===!0&&Te.setGlobalState(P.clippingPlanes,b.state.camera)):b=null,A.pop(),A.length>0?E=A[A.length-1]:E=null,O!==null&&O.renderEnd()};function ga(S,L,W,k){if(S.visible===!1)return;if(S.layers.test(L.layers)){if(S.isGroup)W=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(L);else if(S.isLightProbeGrid)b.pushLightProbeGrid(S);else if(S.isLight)b.pushLight(S),S.castShadow&&b.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(We)){k&&Dt.setFromMatrixPosition(S.matrixWorld).applyMatrix4($e);const _e=J.update(S),ue=S.material;ue.visible&&E.push(S,_e,ue,W,Dt.z,null,L)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(We))){const _e=J.update(S),ue=S.material;if(k&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),Dt.copy(S.boundingSphere.center)):(_e.boundingSphere===null&&_e.computeBoundingSphere(),Dt.copy(_e.boundingSphere.center)),Dt.applyMatrix4(S.matrixWorld).applyMatrix4($e)),Array.isArray(ue)){const Se=_e.groups;for(let Ee=0,ze=Se.length;Ee<ze;Ee++){const Xe=Se[Ee],ye=ue[Xe.materialIndex];ye&&ye.visible&&E.push(S,_e,ye,W,Dt.z,Xe,L)}}else ue.visible&&E.push(S,_e,ue,W,Dt.z,null,L)}}const fe=S.children;for(let _e=0,ue=fe.length;_e<ue;_e++)ga(fe[_e],L,W,k)}function rl(S,L,W,k){const{opaque:z,transmissive:fe,transparent:_e}=S;b.setupLightsView(W),je===!0&&Te.setGlobalState(P.clippingPlanes,W),k&&_.viewport(ne.copy(k)),z.length>0&&nr(z,L,W),fe.length>0&&nr(fe,L,W),_e.length>0&&nr(_e,L,W),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function al(S,L,W,k){if((W.isScene===!0?W.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[k.id]===void 0){const ye=it.has("EXT_color_buffer_half_float")||it.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[k.id]=new yn(1,1,{generateMipmaps:!0,type:ye?Bn:Qt,minFilter:Zn,samples:Math.max(4,R.samples),stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:qe.workingColorSpace})}const fe=b.state.transmissionRenderTarget[k.id],_e=k.viewport||ne;fe.setSize(_e.z*P.transmissionResolutionScale,_e.w*P.transmissionResolutionScale);const ue=P.getRenderTarget(),Se=P.getActiveCubeFace(),Ee=P.getActiveMipmapLevel();P.setRenderTarget(fe),P.getClearColor(dt),Ye=P.getClearAlpha(),Ye<1&&P.setClearColor(16777215,.5),P.clear(),xt&&Be.render(W);const ze=P.toneMapping;P.toneMapping=Un;const Xe=k.viewport;if(k.viewport!==void 0&&(k.viewport=void 0),b.setupLightsView(k),je===!0&&Te.setGlobalState(P.clippingPlanes,k),nr(S,W,k),q.updateMultisampleRenderTarget(fe),q.updateRenderTargetMipmap(fe),it.has("WEBGL_multisampled_render_to_texture")===!1){let ye=!1;for(let tt=0,Et=L.length;tt<Et;tt++){const gt=L[tt],{object:ht,geometry:zt,material:me,group:Vt}=gt;if(me.side===Dn&&ht.layers.test(k.layers)){const Ze=me.side;me.side=$t,me.needsUpdate=!0,ol(ht,W,k,zt,me,Vt),me.side=Ze,me.needsUpdate=!0,ye=!0}}ye===!0&&(q.updateMultisampleRenderTarget(fe),q.updateRenderTargetMipmap(fe))}P.setRenderTarget(ue,Se,Ee),P.setClearColor(dt,Ye),Xe!==void 0&&(k.viewport=Xe),P.toneMapping=ze}function nr(S,L,W){const k=L.isScene===!0?L.overrideMaterial:null;for(let z=0,fe=S.length;z<fe;z++){const _e=S[z],{object:ue,geometry:Se,group:Ee}=_e;let ze=_e.material;ze.allowOverride===!0&&k!==null&&(ze=k),ue.layers.test(W.layers)&&ol(ue,L,W,Se,ze,Ee)}}function ol(S,L,W,k,z,fe){O!==null&&z.isNodeMaterial&&O.setObject(S,z),S.onBeforeRender(P,L,W,k,z,fe),S.modelViewMatrix.multiplyMatrices(W.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),z.onBeforeRender(P,L,W,k,S,fe),z.transparent===!0&&z.side===Dn&&z.forceSinglePass===!1?(z.side=$t,z.needsUpdate=!0,P.renderBufferDirect(W,L,k,z,S,fe),z.side=_i,z.needsUpdate=!0,P.renderBufferDirect(W,L,k,z,S,fe),z.side=Dn):P.renderBufferDirect(W,L,k,z,S,fe),S.onAfterRender(P,L,W,k,z,fe)}function ir(S,L,W){L.isScene!==!0&&(L=Kt);const k=V.get(S),z=b.state.lights,fe=b.state.shadowsArray,_e=z.state.version,ue=ae.getParameters(S,z.state,fe,L,W,b.state.lightProbeGridArray),Se=ae.getProgramCacheKey(ue);let Ee=k.programs;k.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?L.environment:null,k.fog=L.fog;const ze=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;k.envMap=se.get(S.envMap||k.environment,ze),k.envMapRotation=k.environment!==null&&S.envMap===null?L.environmentRotation:S.envMapRotation,Ee===void 0&&(S.addEventListener("dispose",wn),Ee=new Map,k.programs=Ee);let Xe=Ee.get(Se);if(Xe!==void 0){if(k.currentProgram===Xe&&k.lightsStateVersion===_e)return ll(S,ue),Xe}else ue.uniforms=ae.getUniforms(S),O!==null&&S.isNodeMaterial&&O.build(S,W,ue),S.onBeforeCompile(ue,P),Xe=ae.acquireProgram(ue,Se),Ee.set(Se,Xe),k.uniforms=ue.uniforms;const ye=k.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(ye.clippingPlanes=Te.uniform),ll(S,ue),k.needsLights=_u(S),k.lightsStateVersion=_e,k.needsLights&&(ye.ambientLightColor.value=z.state.ambient,ye.lightProbe.value=z.state.probe,ye.sunLights.value=z.state.sun,ye.sunLightShadows.value=z.state.sunShadow,ye.directionalLights.value=z.state.directional,ye.directionalLightShadows.value=z.state.directionalShadow,ye.spotLights.value=z.state.spot,ye.spotLightShadows.value=z.state.spotShadow,ye.rectAreaLights.value=z.state.rectArea,ye.ltc_1.value=z.state.rectAreaLTC1,ye.ltc_2.value=z.state.rectAreaLTC2,ye.pointLights.value=z.state.point,ye.pointLightShadows.value=z.state.pointShadow,ye.hemisphereLights.value=z.state.hemi,ye.sunShadowMatrix.value=z.state.sunShadowMatrix,ye.sunShadowCascade.value=z.state.sunShadowCascade,ye.directionalShadowMatrix.value=z.state.directionalShadowMatrix,ye.spotLightMatrix.value=z.state.spotLightMatrix,ye.spotLightMap.value=z.state.spotLightMap,ye.pointShadowMatrix.value=z.state.pointShadowMatrix),k.lightProbeGrid=b.state.lightProbeGridArray.length>0,k.currentProgram=Xe,k.uniformsList=null,Xe}function cl(S){if(S.uniformsList===null){const L=S.currentProgram.getUniforms();S.uniformsList=Wr.seqWithValue(L.seq,S.uniforms)}return S.uniformsList}function ll(S,L){const W=V.get(S);W.outputColorSpace=L.outputColorSpace,W.batching=L.batching,W.batchingColor=L.batchingColor,W.instancing=L.instancing,W.instancingColor=L.instancingColor,W.instancingMorph=L.instancingMorph,W.skinning=L.skinning,W.morphTargets=L.morphTargets,W.morphNormals=L.morphNormals,W.morphColors=L.morphColors,W.morphTargetsCount=L.morphTargetsCount,W.numClippingPlanes=L.numClippingPlanes,W.numIntersection=L.numClipIntersection,W.vertexAlphas=L.vertexAlphas,W.vertexTangents=L.vertexTangents,W.toneMapping=L.toneMapping}function pu(S,L){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;v.setFromMatrixPosition(L.matrixWorld);for(let W=0,k=S.length;W<k;W++){const z=S[W];if(z.texture!==null&&z.boundingBox.containsPoint(v))return z}return null}function mu(S,L,W,k,z){L.isScene!==!0&&(L=Kt),q.resetTextureUnits();const fe=L.fog,_e=k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial?L.environment:null,ue=ie===null?P.outputColorSpace:ie.isXRRenderTarget===!0?ie.texture.colorSpace:qe.workingColorSpace,Se=k.isMeshStandardMaterial||k.isMeshLambertMaterial&&!k.envMap||k.isMeshPhongMaterial&&!k.envMap,Ee=se.get(k.envMap||_e,Se),ze=k.vertexColors===!0&&!!W.attributes.color&&W.attributes.color.itemSize===4,Xe=!!W.attributes.tangent&&(!!k.normalMap||k.anisotropy>0),ye=!!W.morphAttributes.position,tt=!!W.morphAttributes.normal,Et=!!W.morphAttributes.color;let gt=Un;k.toneMapped&&(ie===null||ie.isXRRenderTarget===!0)&&(gt=P.toneMapping);const ht=W.morphAttributes.position||W.morphAttributes.normal||W.morphAttributes.color,zt=ht!==void 0?ht.length:0,me=V.get(k),Vt=b.state.lights;if(je===!0&&(ut===!0||S!==ee)){const pt=S===ee&&k.id===K;Te.setState(k,S,pt)}let Ze=!1;k.version===me.__version?(me.needsLights&&me.lightsStateVersion!==Vt.state.version||me.outputColorSpace!==ue||z.isBatchedMesh&&me.batching===!1||!z.isBatchedMesh&&me.batching===!0||z.isBatchedMesh&&me.batchingColor===!0&&z._colorsTexture===null||z.isBatchedMesh&&me.batchingColor===!1&&z._colorsTexture!==null||z.isInstancedMesh&&me.instancing===!1||!z.isInstancedMesh&&me.instancing===!0||z.isSkinnedMesh&&me.skinning===!1||!z.isSkinnedMesh&&me.skinning===!0||z.isInstancedMesh&&me.instancingColor===!0&&z.instanceColor===null||z.isInstancedMesh&&me.instancingColor===!1&&z.instanceColor!==null||z.isInstancedMesh&&me.instancingMorph===!0&&z.morphTexture===null||z.isInstancedMesh&&me.instancingMorph===!1&&z.morphTexture!==null||me.envMap!==Ee||k.fog===!0&&me.fog!==fe||me.numClippingPlanes!==void 0&&(me.numClippingPlanes!==Te.numPlanes||me.numIntersection!==Te.numIntersection)||me.vertexAlphas!==ze||me.vertexTangents!==Xe||me.morphTargets!==ye||me.morphNormals!==tt||me.morphColors!==Et||me.toneMapping!==gt||me.morphTargetsCount!==zt||!!me.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(Ze=!0):(Ze=!0,me.__version=k.version);let nn=me.currentProgram;Ze===!0&&(nn=ir(k,L,z),O&&k.isNodeMaterial&&O.onUpdateProgram(k,nn,me));let An=!1,ii=!1,Li=!1;const ot=nn.getUniforms(),vt=me.uniforms;if(_.useProgram(nn.program)&&(An=!0,ii=!0,Li=!0),k.id!==K&&(K=k.id,ii=!0),me.needsLights){const pt=pu(b.state.lightProbeGridArray,z);me.lightProbeGrid!==pt&&(me.lightProbeGrid=pt,ii=!0)}if(An||ee!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),ot.setValue(F,"projectionMatrix",S.projectionMatrix),ot.setValue(F,"viewMatrix",S.matrixWorldInverse);const ri=ot.map.cameraPosition;ri!==void 0&&ri.setValue(F,_t.setFromMatrixPosition(S.matrixWorld)),R.logarithmicDepthBuffer&&ot.setValue(F,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(k.isMeshPhongMaterial||k.isMeshToonMaterial||k.isMeshLambertMaterial||k.isMeshBasicMaterial||k.isMeshStandardMaterial||k.isShaderMaterial)&&ot.setValue(F,"isOrthographic",S.isOrthographicCamera===!0),ee!==S&&(ee=S,ii=!0,Li=!0)}if(me.needsLights&&(Vt.state.sunShadowMap.length>0&&ot.setValue(F,"sunShadowMap",Vt.state.sunShadowMap,q),Vt.state.directionalShadowMap.length>0&&ot.setValue(F,"directionalShadowMap",Vt.state.directionalShadowMap,q),Vt.state.spotShadowMap.length>0&&ot.setValue(F,"spotShadowMap",Vt.state.spotShadowMap,q),Vt.state.pointShadowMap.length>0&&ot.setValue(F,"pointShadowMap",Vt.state.pointShadowMap,q)),z.isSkinnedMesh){ot.setOptional(F,z,"bindMatrix"),ot.setOptional(F,z,"bindMatrixInverse");const pt=z.skeleton;pt&&(pt.boneTexture===null&&pt.computeBoneTexture(),ot.setValue(F,"boneTexture",pt.boneTexture,q))}z.isBatchedMesh&&(ot.setOptional(F,z,"batchingTexture"),ot.setValue(F,"batchingTexture",z._matricesTexture,q),ot.setOptional(F,z,"batchingIdTexture"),ot.setValue(F,"batchingIdTexture",z._indirectTexture,q),ot.setOptional(F,z,"batchingColorTexture"),z._colorsTexture!==null&&ot.setValue(F,"batchingColorTexture",z._colorsTexture,q));const si=W.morphAttributes;if((si.position!==void 0||si.normal!==void 0||si.color!==void 0)&&N.update(z,W,nn),(ii||me.receiveShadow!==z.receiveShadow)&&(me.receiveShadow=z.receiveShadow,ot.setValue(F,"receiveShadow",z.receiveShadow)),(k.isMeshStandardMaterial||k.isMeshLambertMaterial||k.isMeshPhongMaterial)&&k.envMap===null&&L.environment!==null&&(vt.envMapIntensity.value=L.environmentIntensity),vt.dfgLUT!==void 0&&(vt.dfgLUT.value=Mv()),ii){if(ot.setValue(F,"toneMappingExposure",P.toneMappingExposure),me.needsLights&&gu(vt,Li),fe&&k.fog===!0&&be.refreshFogUniforms(vt,fe),be.refreshMaterialUniforms(vt,k,Q,$,b.state.transmissionRenderTarget[S.id]),me.needsLights&&me.lightProbeGrid){const pt=me.lightProbeGrid;vt.probesSH.value=pt.texture,vt.probesMin.value.copy(pt.boundingBox.min),vt.probesMax.value.copy(pt.boundingBox.max),vt.probesResolution.value.copy(pt.resolution)}Wr.upload(F,cl(me),vt,q)}if(k.isShaderMaterial&&k.uniformsNeedUpdate===!0&&(Wr.upload(F,cl(me),vt,q),k.uniformsNeedUpdate=!1),k.isSpriteMaterial&&ot.setValue(F,"center",z.center),ot.setValue(F,"modelViewMatrix",z.modelViewMatrix),ot.setValue(F,"normalMatrix",z.normalMatrix),ot.setValue(F,"modelMatrix",z.matrixWorld),k.uniformsGroups!==void 0){const pt=k.uniformsGroups;for(let ri=0,Di=pt.length;ri<Di;ri++){const dl=pt[ri];te.update(dl,nn),te.bind(dl,nn)}}return nn}function gu(S,L){S.ambientLightColor.needsUpdate=L,S.lightProbe.needsUpdate=L,S.sunLights.needsUpdate=L,S.sunLightShadows.needsUpdate=L,S.directionalLights.needsUpdate=L,S.directionalLightShadows.needsUpdate=L,S.pointLights.needsUpdate=L,S.pointLightShadows.needsUpdate=L,S.spotLights.needsUpdate=L,S.spotLightShadows.needsUpdate=L,S.rectAreaLights.needsUpdate=L,S.hemisphereLights.needsUpdate=L}function _u(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return Z},this.getActiveMipmapLevel=function(){return X},this.getRenderTarget=function(){return ie},this.setRenderTargetTextures=function(S,L,W){const k=V.get(S);k.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,k.__autoAllocateDepthBuffer===!1&&(k.__useRenderToTexture=!1),V.get(S.texture).__webglTexture=L,V.get(S.depthTexture).__webglTexture=k.__autoAllocateDepthBuffer?void 0:W,k.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,L){const W=V.get(S);W.__webglFramebuffer=L,W.__useDefaultFramebuffer=L===void 0},this.setRenderTarget=function(S,L=0,W=0){ie=S,Z=L,X=W;let k=null,z=!1,fe=!1;if(S){const ue=V.get(S);if(ue.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(F.FRAMEBUFFER,ue.__webglFramebuffer),ne.copy(S.viewport),Le.copy(S.scissor),Ae=S.scissorTest,_.viewport(ne),_.scissor(Le),_.setScissorTest(Ae),K=-1;return}else if(ue.__webglFramebuffer===void 0)q.setupRenderTarget(S);else if(ue.__hasExternalTextures)q.rebindTextures(S,V.get(S.texture).__webglTexture,V.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){const ze=S.depthTexture;if(ue.__boundDepthTexture!==ze){if(ze!==null&&V.has(ze)&&(S.width!==ze.image.width||S.height!==ze.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");q.setupDepthRenderbuffer(S)}}const Se=S.texture;(Se.isData3DTexture||Se.isDataArrayTexture||Se.isCompressedArrayTexture)&&(fe=!0);const Ee=V.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(Ee[L])?k=Ee[L][W]:k=Ee[L],z=!0):S.samples>0&&q.useMultisampledRTT(S)===!1?k=V.get(S).__webglMultisampledFramebuffer:Array.isArray(Ee)?k=Ee[W]:k=Ee,ne.copy(S.viewport),Le.copy(S.scissor),Ae=S.scissorTest}else ne.copy(ge).multiplyScalar(Q).floor(),Le.copy(He).multiplyScalar(Q).floor(),Ae=Tt;if(W!==0&&(k=H),_.bindFramebuffer(F.FRAMEBUFFER,k)&&_.drawBuffers(S,k),_.viewport(ne),_.scissor(Le),_.setScissorTest(Ae),z){const ue=V.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+L,ue.__webglTexture,W)}else if(fe){const ue=L;for(let Se=0;Se<S.textures.length;Se++){const Ee=V.get(S.textures[Se]);F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0+Se,Ee.__webglTexture,W,ue)}}else if(S!==null&&W!==0){const ue=V.get(S.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,ue.__webglTexture,W)}K=-1};function hl(S){const L=V.get(S);return(L.__readFormat!==S.format||L.__readType!==S.type)&&(L.__readFormat=S.format,L.__readType=S.type,L.__formatReadable=R.textureFormatReadable(S.format),L.__typeReadable=R.textureTypeReadable(S.type)),L}this.readRenderTargetPixels=function(S,L,W,k,z,fe,_e,ue=0){if(!(S&&S.isWebGLRenderTarget)){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Se=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se){_.bindFramebuffer(F.FRAMEBUFFER,Se);try{const Ee=S.textures[ue],ze=Ee.format,Xe=Ee.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ue);const ye=hl(Ee);if(ye.__formatReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(ye.__typeReadable===!1){Fe("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}L>=0&&L<=S.width-k&&W>=0&&W<=S.height-z&&F.readPixels(L,W,k,z,le.convert(ze),le.convert(Xe),fe)}finally{const Ee=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(F.FRAMEBUFFER,Ee)}}},this.readRenderTargetPixelsAsync=async function(S,L,W,k,z,fe,_e,ue=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Se=V.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&_e!==void 0&&(Se=Se[_e]),Se)if(L>=0&&L<=S.width-k&&W>=0&&W<=S.height-z){_.bindFramebuffer(F.FRAMEBUFFER,Se);const Ee=S.textures[ue],ze=Ee.format,Xe=Ee.type;S.textures.length>1&&F.readBuffer(F.COLOR_ATTACHMENT0+ue);const ye=hl(Ee);if(ye.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(ye.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const tt=F.createBuffer();F.bindBuffer(F.PIXEL_PACK_BUFFER,tt),F.bufferData(F.PIXEL_PACK_BUFFER,fe.byteLength,F.STREAM_READ),F.readPixels(L,W,k,z,le.convert(ze),le.convert(Xe),0),F.bindBuffer(F.PIXEL_PACK_BUFFER,null);const Et=ie!==null?V.get(ie).__webglFramebuffer:null;_.bindFramebuffer(F.FRAMEBUFFER,Et);const gt=F.fenceSync(F.SYNC_GPU_COMMANDS_COMPLETE,0);return F.flush(),await Gf(F,gt,4),F.bindBuffer(F.PIXEL_PACK_BUFFER,tt),F.getBufferSubData(F.PIXEL_PACK_BUFFER,0,fe),F.bindBuffer(F.PIXEL_PACK_BUFFER,null),F.deleteBuffer(tt),F.deleteSync(gt),fe}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,L=null,W=0){const k=Math.pow(2,-W),z=Math.floor(S.image.width*k),fe=Math.floor(S.image.height*k),_e=L!==null?L.x:0,ue=L!==null?L.y:0;q.setTexture2D(S,0),F.copyTexSubImage2D(F.TEXTURE_2D,W,0,0,_e,ue,z,fe),_.unbindTexture()},this.copyTextureToTexture=function(S,L,W=null,k=null,z=0,fe=0){let _e,ue,Se,Ee,ze,Xe,ye,tt,Et;const gt=S.isCompressedTexture?S.mipmaps[fe]:S.image;if(W!==null)_e=W.max.x-W.min.x,ue=W.max.y-W.min.y,Se=W.isBox3?W.max.z-W.min.z:1,Ee=W.min.x,ze=W.min.y,Xe=W.isBox3?W.min.z:0;else{const vt=Math.pow(2,-z);_e=Math.floor(gt.width*vt),ue=Math.floor(gt.height*vt),S.isDataArrayTexture?Se=gt.depth:S.isData3DTexture?Se=Math.floor(gt.depth*vt):Se=1,Ee=0,ze=0,Xe=0}k!==null?(ye=k.x,tt=k.y,Et=k.z):(ye=0,tt=0,Et=0);const ht=le.convert(L.format),zt=le.convert(L.type);let me;L.isData3DTexture?(q.setTexture3D(L,0),me=F.TEXTURE_3D):L.isDataArrayTexture||L.isCompressedArrayTexture?(q.setTexture2DArray(L,0),me=F.TEXTURE_2D_ARRAY):(q.setTexture2D(L,0),me=F.TEXTURE_2D),_.activeTexture(F.TEXTURE0),_.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,L.flipY),_.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),_.pixelStorei(F.UNPACK_ALIGNMENT,L.unpackAlignment);const Vt=_.getParameter(F.UNPACK_ROW_LENGTH),Ze=_.getParameter(F.UNPACK_IMAGE_HEIGHT),nn=_.getParameter(F.UNPACK_SKIP_PIXELS),An=_.getParameter(F.UNPACK_SKIP_ROWS),ii=_.getParameter(F.UNPACK_SKIP_IMAGES);_.pixelStorei(F.UNPACK_ROW_LENGTH,gt.width),_.pixelStorei(F.UNPACK_IMAGE_HEIGHT,gt.height),_.pixelStorei(F.UNPACK_SKIP_PIXELS,Ee),_.pixelStorei(F.UNPACK_SKIP_ROWS,ze),_.pixelStorei(F.UNPACK_SKIP_IMAGES,Xe);const Li=S.isDataArrayTexture||S.isData3DTexture,ot=L.isDataArrayTexture||L.isData3DTexture;if(S.isDepthTexture){const vt=V.get(S),si=V.get(L),pt=V.get(vt.__renderTarget),ri=V.get(si.__renderTarget);_.bindFramebuffer(F.READ_FRAMEBUFFER,pt.__webglFramebuffer),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,ri.__webglFramebuffer);for(let Di=0;Di<Se;Di++)Li&&(F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(S).__webglTexture,z,Xe+Di),F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,V.get(L).__webglTexture,fe,Et+Di)),F.blitFramebuffer(Ee,ze,_e,ue,ye,tt,_e,ue,F.DEPTH_BUFFER_BIT,F.NEAREST);_.bindFramebuffer(F.READ_FRAMEBUFFER,null),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else if(z!==0||S.isRenderTargetTexture||V.has(S)){const vt=V.get(S),si=V.get(L);_.bindFramebuffer(F.READ_FRAMEBUFFER,U),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,G);for(let pt=0;pt<Se;pt++)Li?F.framebufferTextureLayer(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,vt.__webglTexture,z,Xe+pt):F.framebufferTexture2D(F.READ_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,vt.__webglTexture,z),ot?F.framebufferTextureLayer(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,si.__webglTexture,fe,Et+pt):F.framebufferTexture2D(F.DRAW_FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_2D,si.__webglTexture,fe),z!==0?F.blitFramebuffer(Ee,ze,_e,ue,ye,tt,_e,ue,F.COLOR_BUFFER_BIT,F.NEAREST):ot?F.copyTexSubImage3D(me,fe,ye,tt,Et+pt,Ee,ze,_e,ue):F.copyTexSubImage2D(me,fe,ye,tt,Ee,ze,_e,ue);_.bindFramebuffer(F.READ_FRAMEBUFFER,null),_.bindFramebuffer(F.DRAW_FRAMEBUFFER,null)}else ot?S.isDataTexture||S.isData3DTexture?F.texSubImage3D(me,fe,ye,tt,Et,_e,ue,Se,ht,zt,gt.data):L.isCompressedArrayTexture?F.compressedTexSubImage3D(me,fe,ye,tt,Et,_e,ue,Se,ht,gt.data):F.texSubImage3D(me,fe,ye,tt,Et,_e,ue,Se,ht,zt,gt):S.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,fe,ye,tt,_e,ue,ht,zt,gt.data):S.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,fe,ye,tt,gt.width,gt.height,ht,gt.data):F.texSubImage2D(F.TEXTURE_2D,fe,ye,tt,_e,ue,ht,zt,gt);_.pixelStorei(F.UNPACK_ROW_LENGTH,Vt),_.pixelStorei(F.UNPACK_IMAGE_HEIGHT,Ze),_.pixelStorei(F.UNPACK_SKIP_PIXELS,nn),_.pixelStorei(F.UNPACK_SKIP_ROWS,An),_.pixelStorei(F.UNPACK_SKIP_IMAGES,ii),fe===0&&L.generateMipmaps&&F.generateMipmap(me),_.unbindTexture()},this.initRenderTarget=function(S){V.get(S).__webglFramebuffer===void 0&&q.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?q.setTextureCube(S,0):S.isData3DTexture?q.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?q.setTexture2DArray(S,0):q.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){Z=0,X=0,ie=null,_.reset(),pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Fn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=qe._getUnpackColorSpace()}}const ac=1.5,bv=1.3,Nh=4.4,Tv=4,wv=1.4,Xr={green:4449135,yellow:15913803,red:14701138},Av=.12,Rv=2.6,Cv=.8,Pv=.2;function nu(r){return r>.55?Xr.green:r>.25?Xr.yellow:Xr.red}const Iv={enemy:1.8,"enemy-grenade":2,rifle:2.4,shotgun:1.9,rocket:2.2},Lv={health:7400828,weapon:16766298},Dv=6936296,eo={forward:24,right:18,up:12},Nv=60,Qi={bottom:-44,far:120,left:-56,near:.5,right:56,top:44},qr={"jungle-front":{backgroundColor:1781800,fogFar:145,fogNear:75,hemisphereGroundColor:1582363,hemisphereSkyColor:12179364,sunColor:16771246},"desert-refinery":{backgroundColor:12882780,fogFar:145,fogNear:75,hemisphereGroundColor:4666402,hemisphereSkyColor:16768941,sunColor:16769701},"frozen-fortress":{backgroundColor:3427171,fogFar:145,fogNear:75,hemisphereGroundColor:2306365,hemisphereSkyColor:12836850,sunColor:15135487}};class Fv{constructor(e,t){w(this,"cameraDirection",new I);w(this,"cameraRight",new I);this.camera=e,this.sunLight=t}sync(){this.camera.updateMatrixWorld(),this.camera.getWorldDirection(this.cameraDirection),this.cameraRight.crossVectors(this.cameraDirection,this.camera.up).normalize();const e=this.sunLight.position;e.copy(this.camera.position),e.addScaledVector(this.cameraRight,eo.right),e.addScaledVector(this.camera.up,eo.up),e.addScaledVector(this.cameraDirection,eo.forward),this.sunLight.target.position.copy(this.camera.position).addScaledVector(this.cameraDirection,Nv)}}class Uv{static rotationYForDirection(e,t){if(!(Math.hypot(e,t)<=.001))return Math.atan2(-e,-t)}}const Fh="turret-aim";class Ov{constructor(){w(this,"enemyGeometry",new st(.9,1.2,.9));w(this,"turretBaseGeometry",new gi(1.1,1.3,.8,10));w(this,"turretHeadGeometry",new gi(.75,.9,.65,10));w(this,"turretBarrelGeometry",new st(.28,.28,2.4));w(this,"bossHullGeometry",new st(4.2,1.3,5.8));w(this,"bossTurretGeometry",new st(2.4,.9,2.6));w(this,"bossBarrelGeometry",new st(.4,.35,2.3));w(this,"bossTrackGeometry",new st(.55,.65,5.9));w(this,"crawlerRackGeometry",new st(1.05,1.1,3.7));w(this,"droneBodyGeometry",new Ci(.75,12,8));w(this,"droneRotorGeometry",new st(2.2,.08,.25));w(this,"shieldBodyGeometry",new st(.9,1.7,.6));w(this,"shieldPlateGeometry",new st(.15,1.5,1.4));w(this,"mechCoreGeometry",new st(4.4,3.2,3.7));w(this,"mechHeadGeometry",new st(2.4,1.35,2.1));w(this,"mechLegGeometry",new st(1.15,3.2,1.45));w(this,"mechCannonGeometry",new st(.55,.55,4.1));w(this,"enemyMaterials",{grunt:new ve({color:11948093}),gunner:new ve({color:14258485}),heavy:new ve({color:7487036}),turret:new ve({color:7301723}),boss_tank:new ve({color:3754034,roughness:.82}),raider:new ve({color:9981743,roughness:.85}),sniper:new ve({color:8147766,roughness:.85}),bomber:new ve({color:11560755,roughness:.85}),boss_crawler:new ve({color:7492402,roughness:.82}),drone:new ve({color:10336713,roughness:.7,metalness:.35}),shield:new ve({color:7242902,roughness:.8}),boss_mech:new ve({color:4414579,roughness:.72,metalness:.4})});w(this,"desertEnemyMaterials",{heavy:new ve({color:5057056,roughness:.85}),turret:new ve({color:8414027,roughness:.9})});w(this,"bossDetailMaterial",new ve({color:2042907,roughness:.9}));w(this,"crawlerDetailMaterial",new ve({color:3944487,roughness:.9}));w(this,"droneDetailMaterial",new ve({color:14085623,roughness:.55,metalness:.25}));w(this,"shieldDetailMaterial",new ve({color:11849951,roughness:.6,metalness:.2}));w(this,"mechDetailMaterial",new ve({color:2043970,roughness:.85,metalness:.35}));w(this,"obstacleGeometries",{tree:new er(1.3,5,7),rock:new Ys(1.25,0),crate:new st(1.8,1.5,1.8),wall:new st(3.6,1.7,.75),barrel:new gi(.8,.8,1.6,8),wreck:new st(3.8,1,4.6),roadblock:new st(3,1.1,.8),bunker:new st(4.2,2,3.6)});w(this,"obstacleMaterials",{tree:new ve({color:3110977}),rock:new ve({color:7961189}),crate:new ve({color:10056e3}),wall:new ve({color:10123600}),barrel:new ve({color:9260077}),wreck:new ve({color:7230274}),roadblock:new ve({color:11700818}),bunker:new ve({color:8545868})});w(this,"desertObstacleMaterials",{rock:new ve({color:8416343}),crate:new ve({color:10185022})});w(this,"pickupGeometry",new Bc(.35));w(this,"pickupMaterials",{health:new ve({color:7594092,emissive:1862945}),weapon:new ve({color:16107596,emissive:8014603})});w(this,"projectileGeometry",new Ci(.25,8,6));w(this,"grenadeGeometry",new Ys(.28,0));w(this,"rocketSmokeGeometry",new Ci(.16,6,6));w(this,"projectileMaterials",{enemy:new ve({color:16734761,emissive:16724992}),"enemy-grenade":new ve({color:11984721,emissive:4613403}),rifle:new ve({color:16768883,emissive:13994006}),shotgun:new ve({color:11068911,emissive:2918562}),rocket:new ve({color:16755538,emissive:14440718})});w(this,"turretDetailMaterial",new ve({color:3423038,roughness:.72,metalness:.45}));w(this,"disposed",!1);w(this,"playerMesh",new Pe(new Oc(.42,.9,4,8),new ve({color:16107596,emissive:5912064,emissiveIntensity:.7})));w(this,"healthBack",new tc(new Qr({color:5906464,depthTest:!1})));w(this,"healthFill",new tc(new Qr({color:5820527,depthTest:!1})))}createEnemy(e,t){if(e==="turret")return this.createTurretGroup();if(e==="boss_tank")return this.createBossGroup();if(e==="boss_crawler")return this.createCrawlerGroup();if(e==="drone")return this.createDroneGroup();if(e==="shield")return this.createShieldGroup();if(e==="boss_mech")return this.createMechGroup();let n=this.enemyMaterials[e];return t==="desert-refinery"&&(n=this.desertEnemyMaterials[e]??n),new Pe(this.enemyGeometry,n)}aimTurret(e,t,n){const i=e.getObjectByName(Fh),s=Uv.rotationYForDirection(t,n);!i||s===void 0||(i.rotation.y=s)}createObstacle(e,t){let n=this.obstacleMaterials[e];return t==="desert-refinery"&&(n=this.desertObstacleMaterials[e]??n),new Pe(this.obstacleGeometries[e],n)}createPickup(e){const t=new Pe(this.pickupGeometry,this.pickupMaterials[e]);return t.scale.setScalar(Tv),t}createProjectile(e){return e==="enemy-grenade"?new Pe(this.grenadeGeometry,this.projectileMaterials[e]):new Pe(this.projectileGeometry,this.projectileMaterials[e])}createRocketSmoke(e){const t=new jn({color:7038557,transparent:!0,opacity:.5}),n=new Pe(this.rocketSmokeGeometry,t);return n.position.set(e.x,1,e.z),n}dispose(){if(!this.disposed){this.disposed=!0,this.enemyGeometry.dispose(),this.turretBaseGeometry.dispose(),this.turretHeadGeometry.dispose(),this.turretBarrelGeometry.dispose(),this.bossHullGeometry.dispose(),this.bossTurretGeometry.dispose(),this.bossBarrelGeometry.dispose(),this.bossTrackGeometry.dispose(),this.crawlerRackGeometry.dispose(),this.droneBodyGeometry.dispose(),this.droneRotorGeometry.dispose(),this.shieldBodyGeometry.dispose(),this.shieldPlateGeometry.dispose(),this.mechCoreGeometry.dispose(),this.mechHeadGeometry.dispose(),this.mechLegGeometry.dispose(),this.mechCannonGeometry.dispose(),this.pickupGeometry.dispose(),this.projectileGeometry.dispose(),this.grenadeGeometry.dispose(),this.rocketSmokeGeometry.dispose();for(const e of Object.values(this.obstacleGeometries))e.dispose();for(const e of Object.values(this.enemyMaterials))e.dispose();for(const e of Object.values(this.desertEnemyMaterials))e.dispose();for(const e of Object.values(this.obstacleMaterials))e.dispose();for(const e of Object.values(this.desertObstacleMaterials))e.dispose();for(const e of Object.values(this.pickupMaterials))e.dispose();for(const e of Object.values(this.projectileMaterials))e.dispose();this.playerMesh.geometry.dispose(),this.playerMesh.material.dispose(),this.bossDetailMaterial.dispose(),this.crawlerDetailMaterial.dispose(),this.droneDetailMaterial.dispose(),this.shieldDetailMaterial.dispose(),this.mechDetailMaterial.dispose(),this.turretDetailMaterial.dispose(),this.healthBack.material.dispose(),this.healthFill.material.dispose()}}createBossGroup(){const e=new wt,t=new Pe(this.bossHullGeometry,this.enemyMaterials.boss_tank);t.position.y=.85;const n=new Pe(this.bossTurretGeometry,this.enemyMaterials.boss_tank);n.position.set(0,1.85,.3);const i=new Pe(this.bossBarrelGeometry,this.bossDetailMaterial);i.position.set(0,1.8,-2.4);const s=new Pe(this.bossTrackGeometry,this.bossDetailMaterial);s.position.set(-2.15,.58,0);const a=new Pe(this.bossTrackGeometry,this.bossDetailMaterial);return a.position.set(2.15,.58,0),e.add(t,n,i,s,a),e}createDroneGroup(){const e=new wt,t=new Pe(this.droneBodyGeometry,this.enemyMaterials.drone);t.position.y=0;const n=new Pe(this.droneRotorGeometry,this.droneDetailMaterial);return n.position.y=.8,e.add(t,n),e}createTurretGroup(){const e=new wt,t=new Pe(this.turretBaseGeometry,this.enemyMaterials.turret);t.position.y=.4;const n=new wt;n.name=Fh;const i=new Pe(this.turretHeadGeometry,this.enemyMaterials.turret);i.position.y=.95;const s=new Pe(this.turretBarrelGeometry,this.turretDetailMaterial);return s.position.set(0,1.02,-1.2),n.add(i,s),e.add(t,n),e}createShieldGroup(){const e=new wt,t=new Pe(this.shieldBodyGeometry,this.enemyMaterials.shield);t.position.y=1;const n=new Pe(this.shieldPlateGeometry,this.shieldDetailMaterial);return n.position.set(0,1.1,-.55),e.add(t,n),e}createMechGroup(){const e=new wt,t=this.enemyMaterials.boss_mech,n=new Pe(this.mechCoreGeometry,t);n.position.y=3.25;const i=new Pe(this.mechHeadGeometry,this.mechDetailMaterial);i.position.set(0,5.3,-.2);const s=new Pe(this.mechLegGeometry,this.mechDetailMaterial);s.position.set(-1.65,1.6,.5);const a=new Pe(this.mechLegGeometry,this.mechDetailMaterial);a.position.set(1.65,1.6,.5);const o=new Pe(this.mechCannonGeometry,t);o.position.set(-2.65,4.2,-2.15);const c=new Pe(this.mechCannonGeometry,t);return c.position.set(2.65,4.2,-2.15),e.add(n,i,s,a,o,c),e}createCrawlerGroup(){const e=new wt,t=this.enemyMaterials.boss_crawler,n=new Pe(this.bossHullGeometry,t);n.position.y=.85;const i=new Pe(this.bossTrackGeometry,this.crawlerDetailMaterial);i.position.set(-2.15,.58,0);const s=new Pe(this.bossTrackGeometry,this.crawlerDetailMaterial);s.position.set(2.15,.58,0);const a=new Pe(this.crawlerRackGeometry,t);a.position.set(-1.35,1.9,-.2);const o=new Pe(this.crawlerRackGeometry,t);return o.position.set(1.35,1.9,-.2),e.add(n,i,s,a,o),e}}function Uh(r,e){if(e===Rf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===Qo||e===Ad){let t=r.getIndex();if(t===null){const s=[],a=r.getAttribute("position");if(a!==void 0){for(let o=0;o<a.count;o++)s.push(o);r.setIndex(s),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}const n=t.count-2,i=[];if(e===Qo)for(let s=1;s<=n;s++)i.push(t.getX(0)),i.push(t.getX(s)),i.push(t.getX(s+1));else for(let s=0;s<n;s++)s%2===0?(i.push(t.getX(s)),i.push(t.getX(s+1)),i.push(t.getX(s+2))):(i.push(t.getX(s+2)),i.push(t.getX(s+1)),i.push(t.getX(s)));return i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles."),r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}function ua(r){const e=new Map,t=new Map,n=r.clone();return iu(r,n,function(i,s){e.set(s,i),t.set(i,s)}),n.traverse(function(i){if(!i.isSkinnedMesh)return;const s=i,a=e.get(i),o=a.skeleton.bones;s.skeleton=a.skeleton.clone(),s.bindMatrix.copy(a.bindMatrix),s.skeleton.bones=o.map(function(c){return t.get(c)}),s.bind(s.skeleton,s.bindMatrix)}),n}function iu(r,e,t){t(r,e);for(let n=0;n<r.children.length;n++)iu(r.children[n],e.children[n],t)}class Vc extends ps{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Hv(t)}),this.register(function(t){return new Vv(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new eS(t)}),this.register(function(t){return new Xv(t)}),this.register(function(t){return new qv(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new $v(t)}),this.register(function(t){return new Gv(t)}),this.register(function(t){return new Yv(t)}),this.register(function(t){return new Wv(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new kv(t)}),this.register(function(t){return new Oh(t,Ve.EXT_MESHOPT_COMPRESSION)}),this.register(function(t){return new Oh(t,Ve.KHR_MESHOPT_COMPRESSION)}),this.register(function(t){return new tS(t)})}load(e,t,n,i){const s=this;let a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){const l=Bs.extractUrlBase(e);a=Bs.resolveURL(l,this.path)}else a=Bs.extractUrlBase(e);this.manager.itemStart(e);const o=function(l){i?i(l):console.error(l),s.manager.itemError(e),s.manager.itemEnd(e)},c=new Xd(this.manager);c.setPath(this.path),c.setResponseType("arraybuffer"),c.setRequestHeader(this.requestHeader),c.setWithCredentials(this.withCredentials),c.load(e,function(l){try{s.parse(l,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s;const a={},o={},c=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(c.decode(new Uint8Array(e,0,4))===su){try{a[Ve.KHR_BINARY_GLTF]=new nS(e)}catch(d){i&&i(d);return}s=JSON.parse(a[Ve.KHR_BINARY_GLTF].content)}else s=JSON.parse(c.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const l=new mS(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});l.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){const d=this.pluginCallbacks[h](l);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[d.name]=d,a[d.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){const d=s.extensionsUsed[h],u=s.extensionsRequired||[];switch(d){case Ve.KHR_MATERIALS_UNLIT:a[d]=new zv;break;case Ve.KHR_DRACO_MESH_COMPRESSION:a[d]=new iS(s,this.dracoLoader);break;case Ve.KHR_TEXTURE_TRANSFORM:a[d]=new sS;break;case Ve.KHR_MESH_QUANTIZATION:a[d]=new rS;break;default:u.indexOf(d)>=0&&o[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}l.setExtensions(a),l.setPlugins(o),l.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}}function Bv(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function yt(r,e,t){const n=r.json.materials[e];return n.extensions&&n.extensions[t]?n.extensions[t]:null}const Ve={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",KHR_MESHOPT_COMPRESSION:"KHR_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class kv{constructor(e){this.parser=e,this.name=Ve.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const s=t.json,c=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e];let l;const h=new Ce(16777215);c.color!==void 0&&h.setRGB(c.color[0],c.color[1],c.color[2],tn);const d=c.range!==void 0?c.range:0;switch(c.type){case"directional":l=new Kd(h),l.target.position.set(0,0,-1),l.add(l.target);break;case"point":l=new om(h),l.distance=d;break;case"spot":l=new rm(h),l.distance=d,c.spot=c.spot||{},c.spot.innerConeAngle=c.spot.innerConeAngle!==void 0?c.spot.innerConeAngle:0,c.spot.outerConeAngle=c.spot.outerConeAngle!==void 0?c.spot.outerConeAngle:Math.PI/4,l.angle=c.spot.outerConeAngle,l.penumbra=1-c.spot.innerConeAngle/c.spot.outerConeAngle,l.target.position.set(0,0,-1),l.add(l.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+c.type)}return l.position.set(0,0,0),Pn(l,c),c.intensity!==void 0&&(l.intensity=c.intensity),l.name=t.createUniqueName(c.name||"light_"+e),i=Promise.resolve(l),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(c){return n._getNodeRef(t.cache,o,c)})}}class zv{constructor(){this.name=Ve.KHR_MATERIALS_UNLIT}getMaterialType(){return jn}extendParams(e,t,n){const i=[];e.color=new Ce(1,1,1),e.opacity=1;const s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){const a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],tn),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,Ut))}return Promise.all(i)}}class Gv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);return n===null||n.emissiveStrength!==void 0&&(t.emissiveIntensity=n.emissiveStrength),Promise.resolve()}}class Hv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(n.clearcoatFactor!==void 0&&(t.clearcoat=n.clearcoatFactor),n.clearcoatTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatMap",n.clearcoatTexture)),n.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=n.clearcoatRoughnessFactor),n.clearcoatRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"clearcoatRoughnessMap",n.clearcoatRoughnessTexture)),n.clearcoatNormalTexture!==void 0&&(i.push(this.parser.assignTexture(t,"clearcoatNormalMap",n.clearcoatNormalTexture)),n.clearcoatNormalTexture.scale!==void 0)){const s=n.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Ne(s,s)}return Promise.all(i)}}class Vv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_DISPERSION}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);return n===null||(t.dispersion=n.dispersion!==void 0?n.dispersion:0),Promise.resolve()}}class Wv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.iridescenceFactor!==void 0&&(t.iridescence=n.iridescenceFactor),n.iridescenceTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceMap",n.iridescenceTexture)),n.iridescenceIor!==void 0&&(t.iridescenceIOR=n.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),n.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=n.iridescenceThicknessMinimum),n.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=n.iridescenceThicknessMaximum),n.iridescenceThicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"iridescenceThicknessMap",n.iridescenceThicknessTexture)),Promise.all(i)}}class Xv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SHEEN}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];if(t.sheenColor=new Ce(0,0,0),t.sheenRoughness=0,t.sheen=1,n.sheenColorFactor!==void 0){const s=n.sheenColorFactor;t.sheenColor.setRGB(s[0],s[1],s[2],tn)}return n.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=n.sheenRoughnessFactor),n.sheenColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenColorMap",n.sheenColorTexture,Ut)),n.sheenRoughnessTexture!==void 0&&i.push(this.parser.assignTexture(t,"sheenRoughnessMap",n.sheenRoughnessTexture)),Promise.all(i)}}class qv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.transmissionFactor!==void 0&&(t.transmission=n.transmissionFactor),n.transmissionTexture!==void 0&&i.push(this.parser.assignTexture(t,"transmissionMap",n.transmissionTexture)),Promise.all(i)}}class Kv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_VOLUME}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.thickness=n.thicknessFactor!==void 0?n.thicknessFactor:0,n.thicknessTexture!==void 0&&i.push(this.parser.assignTexture(t,"thicknessMap",n.thicknessTexture)),t.attenuationDistance=n.attenuationDistance||1/0;const s=n.attenuationColor||[1,1,1];return t.attenuationColor=new Ce().setRGB(s[0],s[1],s[2],tn),Promise.all(i)}}class $v{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_IOR}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);return n===null||(t.ior=n.ior!==void 0?n.ior:1.5,t.ior===0&&(t.ior=1e3)),Promise.resolve()}}class Yv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_SPECULAR}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];t.specularIntensity=n.specularFactor!==void 0?n.specularFactor:1,n.specularTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularIntensityMap",n.specularTexture));const s=n.specularColorFactor||[1,1,1];return t.specularColor=new Ce().setRGB(s[0],s[1],s[2],tn),n.specularColorTexture!==void 0&&i.push(this.parser.assignTexture(t,"specularColorMap",n.specularColorTexture,Ut)),Promise.all(i)}}class Zv{constructor(e){this.parser=e,this.name=Ve.EXT_MATERIALS_BUMP}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return t.bumpScale=n.bumpFactor!==void 0?n.bumpFactor:1,n.bumpTexture!==void 0&&i.push(this.parser.assignTexture(t,"bumpMap",n.bumpTexture)),Promise.all(i)}}class jv{constructor(e){this.parser=e,this.name=Ve.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){return yt(this.parser,e,this.name)!==null?Hn:null}extendMaterialParams(e,t){const n=yt(this.parser,e,this.name);if(n===null)return Promise.resolve();const i=[];return n.anisotropyStrength!==void 0&&(t.anisotropy=n.anisotropyStrength),n.anisotropyRotation!==void 0&&(t.anisotropyRotation=n.anisotropyRotation),n.anisotropyTexture!==void 0&&i.push(this.parser.assignTexture(t,"anisotropyMap",n.anisotropyTexture)),Promise.all(i)}}class Jv{constructor(e){this.parser=e,this.name=Ve.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}}class Qv{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class eS{constructor(e){this.parser=e,this.name=Ve.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;const a=s.extensions[t],o=i.images[a.source];let c=n.textureLoader;if(o.uri){const l=n.options.manager.getHandler(o.uri);l!==null&&(c=l)}return n.loadTextureImage(e,a.source,c)}}class Oh{constructor(e,t){this.name=t,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){const c=i.byteOffset||0,l=i.byteLength||0,h=i.count,d=i.byteStride,u=new Uint8Array(o,c,l);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,d,u,i.mode,i.filter).then(function(f){return f.buffer}):a.ready.then(function(){const f=new ArrayBuffer(h*d);return a.decodeGltfBuffer(new Uint8Array(f),h,d,u,i.mode,i.filter),f})})}else return null}}class tS{constructor(e){this.name=Ve.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const l of i.primitives)if(l.mode!==rn.TRIANGLES&&l.mode!==rn.TRIANGLE_STRIP&&l.mode!==rn.TRIANGLE_FAN&&l.mode!==void 0)return null;const a=n.extensions[this.name].attributes,o=[],c={};for(const l in a)o.push(this.parser.getDependency("accessor",a[l]).then(h=>(c[l]=h,c[l])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(l=>{const h=l.pop(),d=h.isGroup?h.children:[h],u=l[0].count,f=[];for(const g of d){const y=new ke,m=new I,p=new hn,M=new I(1,1,1),C=new Jt(g.geometry,g.material,u);for(let E=0;E<u;E++)c.TRANSLATION&&m.fromBufferAttribute(c.TRANSLATION,E),c.ROTATION&&p.fromBufferAttribute(c.ROTATION,E),c.SCALE&&M.fromBufferAttribute(c.SCALE,E),C.setMatrixAt(E,y.compose(m,p,M));let v=null;for(const E in c)if(E==="_COLOR_0"){const b=c[E];C.instanceColor=new ea(b.array,b.itemSize,b.normalized)}else if(E!=="TRANSLATION"&&E!=="ROTATION"&&E!=="SCALE"){if(v===null){const A=C.geometry;v=new Lt,v.name=A.name;for(const x in A.attributes)v.setAttribute(x,A.attributes[x]);for(const x in A.morphAttributes)v.morphAttributes[x]=A.morphAttributes[x];A.index!==null&&v.setIndex(A.index),v.morphTargetsRelative=A.morphTargetsRelative;for(const x of A.groups)v.addGroup(x.start,x.count,x.materialIndex);A.boundingBox!==null&&(v.boundingBox=A.boundingBox.clone()),A.boundingSphere!==null&&(v.boundingSphere=A.boundingSphere.clone()),v.drawRange.start=A.drawRange.start,v.drawRange.count=A.drawRange.count,v.userData=Object.assign({},A.userData),C.geometry=v}const b=c[E];v.setAttribute(E,new ea(b.array,b.itemSize,b.normalized))}lt.prototype.copy.call(C,g),this.parser.assignFinalMaterial(C),f.push(C)}return h.isGroup?(h.clear(),h.add(...f),h):f[0]}))}}const su="glTF",Is=12,Bh={JSON:1313821514,BIN:5130562};class nS{constructor(e){this.name=Ve.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,Is),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==su)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-Is,s=new DataView(e,Is);let a=0;for(;a<i;){const o=s.getUint32(a,!0);a+=4;const c=s.getUint32(a,!0);if(a+=4,c===Bh.JSON){const l=new Uint8Array(e,Is+a,o);this.content=n.decode(l)}else if(c===Bh.BIN){const l=Is+a;this.body=e.slice(l,l+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class iS{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Ve.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},c={},l={};for(const h in a){const d=oc[h]||h.toLowerCase();o[d]=a[h]}for(const h in e.attributes){const d=oc[h]||h.toLowerCase();if(a[h]!==void 0){const u=n.accessors[e.attributes[h]],f=as[u.componentType];l[d]=f.name,c[d]=u.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(d,u){i.decodeDracoFile(h,function(f){for(const g in f.attributes){const y=f.attributes[g],m=c[g];m!==void 0&&(y.normalized=m)}d(f)},o,l,tn,u)})})}}class sS{constructor(){this.name=Ve.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){if((t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0)return e;if(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),t.rotation!==void 0){const n=Math.cos(e.rotation),i=Math.sin(e.rotation);e.matrix.set(e.repeat.x*n,e.repeat.y*i,e.offset.x,-e.repeat.x*i,e.repeat.y*n,e.offset.y,0,0,1),e.matrixAutoUpdate=!1}return e.needsUpdate=!0,e}}class rS{constructor(){this.name=Ve.KHR_MESH_QUANTIZATION}}class ru extends ds{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){const s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,c=o*2,l=o*3,h=i-t,d=(n-t)/h,u=d*d,f=u*d,g=e*l,y=g-l,m=-2*f+3*u,p=f-u,M=1-m,C=p-u+d;for(let v=0;v!==o;v++){const E=a[y+v+o],b=a[y+v+c]*h,A=a[g+v+o],x=a[g+v]*h;s[v]=M*E+C*b+m*A+p*x}return s}}const aS=new hn;class oS extends ru{interpolate_(e,t,n,i){const s=super.interpolate_(e,t,n,i);return aS.fromArray(s).normalize().toArray(s),s}}const rn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},as={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},kh={9728:At,9729:Rt,9984:xd,9985:Br,9986:Ds,9987:Zn},zh={33071:Nn,33648:Kr,10497:cs},to={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},oc={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},ui={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},cS={CUBICSPLINE:void 0,LINEAR:Ws,STEP:Vs},no={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function lS(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new ve({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:_i})),r.DefaultMaterial}function wi(r,e,t){for(const n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Pn(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function hS(r,e,t){let n=!1,i=!1,s=!1;for(let l=0,h=e.length;l<h;l++){const d=e[l];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);const a=[],o=[],c=[];for(let l=0,h=e.length;l<h;l++){const d=e[l];if(n){const u=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):r.attributes.position;a.push(u)}if(i){const u=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):r.attributes.normal;o.push(u)}if(s){const u=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):r.attributes.color;c.push(u)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c)]).then(function(l){const h=l[0],d=l[1],u=l[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=d),s&&(r.morphAttributes.color=u),r.morphTargetsRelative=!0,r})}function dS(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function uS(r){let e;const t=r.extensions&&r.extensions[Ve.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+io(t.attributes):e=r.indices+":"+io(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+io(r.targets[n]);return e}function io(r){let e="";const t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function cc(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function fS(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const pS=new ke;class mS{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Bv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"&&typeof navigator.userAgent<"u"){const o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;const c=o.match(/Version\/(\d+)/);i=n&&c?parseInt(c[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new nm(this.options.manager):this.textureLoader=new lm(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xd(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){const o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return wi(s,o,i),Pn(o,i),Promise.all(n._invokeAll(function(c){return c.afterRoot&&c.afterRoot(o)})).then(function(){for(const c of o.scenes)c.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){const a=t[i].joints;for(let o=0,c=a.length;o<c;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){const a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),s=(a,o)=>{const c=this.associations.get(a);c!=null&&this.associations.set(o,c);for(const[l,h]of a.children.entries())s(h,o.children[l])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Ve.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(s,a){n.load(Bs.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const a=to[i.type],o=as[i.componentType],c=i.normalized===!0,l=new o(i.count*a);return Promise.resolve(new Yt(l,a,c))}const s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){const o=a[0],c=to[i.type],l=as[i.componentType],h=l.BYTES_PER_ELEMENT,d=h*c,u=i.byteOffset||0,f=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,g=i.normalized===!0;let y,m;if(f&&f!==d){const p=Math.floor(u/f),M="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let C=t.cache.get(M);C||(y=new l(o,p*f,i.count*f/h),C=new Nd(y,f/h),t.cache.add(M,C)),m=new Ks(C,c,u%f/h,g)}else o===null?y=new l(i.count*c):y=new l(o,u,i.count*c),m=new Yt(y,c,g);if(i.sparse!==void 0){const p=to.SCALAR,M=as[i.sparse.indices.componentType],C=i.sparse.indices.byteOffset||0,v=i.sparse.values.byteOffset||0,E=new M(a[1],C,i.sparse.count*p),b=new l(a[2],v,i.sparse.count*c);o!==null&&(m=new Yt(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let A=0,x=E.length;A<x;A++){const T=E[A];if(m.setX(T,b[A*c]),c>=2&&m.setY(T,b[A*c+1]),c>=3&&m.setZ(T,b[A*c+2]),c>=4&&m.setW(T,b[A*c+3]),c>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=g}return m})}loadTexture(e){const t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s];let o=this.textureLoader;if(a.uri){const c=n.manager.getHandler(a.uri);c!==null&&(o=c)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){const i=this,s=this.json,a=s.textures[e],o=s.images[t],c=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[c])return this.textureCache[c];const l=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);const u=(s.samplers||{})[a.sampler]||{};return h.magFilter=kh[u.magFilter]||Rt,h.minFilter=kh[u.minFilter]||Zn,h.wrapS=zh[u.wrapS]||cs,h.wrapT=zh[u.wrapT]||cs,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==At&&h.minFilter!==Rt,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[c]=l,l}loadImageSource(e,t){const n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const a=i.images[e],o=self.URL||self.webkitURL;let c=a.uri||"",l=!1;if(a.bufferView!==void 0)c=n.getDependency("bufferView",a.bufferView).then(function(d){l=!0;const u=new Blob([d],{type:a.mimeType});return c=o.createObjectURL(u),c});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const h=Promise.resolve(c).then(function(d){return new Promise(function(u,f){let g=u;t.isImageBitmapLoader===!0&&(g=function(y){const m=new St(y);m.needsUpdate=!0,u(m)}),t.load(Bs.resolveURL(d,s.path),g,void 0,f)})}).then(function(d){return l===!0&&o.revokeObjectURL(c),Pn(d,a),d.userData.mimeType=a.mimeType||fS(a.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",c),d});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){const s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[Ve.KHR_TEXTURE_TRANSFORM]){const o=n.extensions!==void 0?n.extensions[Ve.KHR_TEXTURE_TRANSFORM]:void 0;if(o){const c=s.associations.get(a);a=s.extensions[Ve.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,c)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){const o="PointsMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Bd,Mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,c.sizeAttenuation=!1,this.cache.add(o,c)),n=c}else if(e.isLine){const o="LineBasicMaterial:"+n.uuid;let c=this.cache.get(o);c||(c=new Od,Mn.prototype.copy.call(c,n),c.color.copy(n.color),c.map=n.map,this.cache.add(o,c)),n=c}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let c=this.cache.get(o);c||(c=n.clone(),s&&(c.vertexColors=!0),a&&(c.flatShading=!0),i&&(c.normalScale&&(c.normalScale.y*=-1),c.clearcoatNormalScale&&(c.clearcoatNormalScale.y*=-1)),this.cache.add(o,c),this.associations.set(c,this.associations.get(n))),n=c}e.material=n}getMaterialType(){return ve}loadMaterial(e){const t=this,n=this.json,i=this.extensions,s=n.materials[e];let a;const o={},c=s.extensions||{},l=[];if(c[Ve.KHR_MATERIALS_UNLIT]){const d=i[Ve.KHR_MATERIALS_UNLIT];a=d.getMaterialType(),l.push(d.extendParams(o,s,t))}else{const d=s.pbrMetallicRoughness||{};if(o.color=new Ce(1,1,1),o.opacity=1,Array.isArray(d.baseColorFactor)){const u=d.baseColorFactor;o.color.setRGB(u[0],u[1],u[2],tn),o.opacity=u[3]}d.baseColorTexture!==void 0&&l.push(t.assignTexture(o,"map",d.baseColorTexture,Ut)),o.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,o.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(l.push(t.assignTexture(o,"metalnessMap",d.metallicRoughnessTexture)),l.push(t.assignTexture(o,"roughnessMap",d.metallicRoughnessTexture))),a=this._invokeOne(function(u){return u.getMaterialType&&u.getMaterialType(e)}),l.push(Promise.all(this._invokeAll(function(u){return u.extendMaterialParams&&u.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=Dn);const h=s.alphaMode||no.OPAQUE;if(h===no.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===no.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==jn&&(l.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new Ne(1,1),s.normalTexture.scale!==void 0)){const d=s.normalTexture.scale;o.normalScale.set(d,d)}if(s.occlusionTexture!==void 0&&a!==jn&&(l.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==jn){const d=s.emissiveFactor;o.emissive=new Ce().setRGB(d[0],d[1],d[2],tn)}return s.emissiveTexture!==void 0&&a!==jn&&l.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,Ut)),Promise.all(l).then(function(){const d=new a(o);return s.name&&(d.name=s.name),Pn(d,s),t.associations.set(d,{materials:e}),s.extensions&&wi(i,d,s),d})}createUniqueName(e){const t=nt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[Ve.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(c){return Gh(c,o,t)})}const a=[];for(let o=0,c=e.length;o<c;o++){const l=e[o],h=uS(l),d=i[h];if(d)a.push(d.promise);else{let u;l.extensions&&l.extensions[Ve.KHR_DRACO_MESH_COMPRESSION]?u=s(l):u=Gh(new Lt,l,t),l.mode===rn.TRIANGLE_STRIP?u=u.then(f=>Uh(f,Ad)):l.mode===rn.TRIANGLE_FAN&&(u=u.then(f=>Uh(f,Qo))),i[h]={primitive:l,promise:u},a.push(u)}}return Promise.all(a)}loadMesh(e){const t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let c=0,l=a.length;c<l;c++){const h=a[c].material===void 0?lS(this.cache):this.getDependency("material",a[c].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(async function(c){const l=c.slice(0,c.length-1),h=c[c.length-1],d=[];for(let f=0,g=h.length;f<g;f++){const y=h[f],m=a[f];let p;const M=l[f];if(m.mode===rn.TRIANGLES||m.mode===rn.TRIANGLE_STRIP||m.mode===rn.TRIANGLE_FAN||m.mode===void 0){const C=s.isSkinnedMesh===!0,v=y.hasAttribute("skinIndex")&&y.hasAttribute("skinWeight");C&&v===!1&&console.warn("THREE.GLTFLoader: Missing skinIndex or skinWeight attributes. Skinning disabled."),p=C&&v?new Ap(y,M):new Pe(y,M),p.isSkinnedMesh===!0&&p.normalizeSkinWeights()}else if(m.mode===rn.LINES)p=new Ip(y,M);else if(m.mode===rn.LINE_STRIP)p=new Uc(y,M);else if(m.mode===rn.LINE_LOOP)p=new Lp(y,M);else if(m.mode===rn.POINTS)p=new Dp(y,M);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(p.geometry.morphAttributes).length>0&&dS(p,s),p.name=t.createUniqueName(s.name||"mesh_"+e),Pn(p,s),m.extensions&&wi(i,p,m),t.assignFinalMaterial(p),d.push(p)}for(let f=0,g=d.length;f<g;f++)t.associations.set(d[f],{meshes:e,primitives:f});if(d.length===1)return s.extensions&&wi(i,d[0],s),d[0];const u=new wt;s.extensions&&wi(i,u,s),t.associations.set(u,{meshes:e});for(let f=0,g=d.length;f<g;f++)u.add(d[f]);return u})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new qt(gn.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new la(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Pn(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const s=i.pop(),a=i,o=[],c=[];for(let l=0,h=a.length;l<h;l++){const d=a[l];if(d){o.push(d);const u=new ke;s!==null&&u.fromArray(s.array,l*16),c.push(u)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[l])}return new Nc(o,c)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],c=[],l=[],h=[];for(let d=0,u=i.channels.length;d<u;d++){const f=i.channels[d],g=i.samplers[f.sampler],y=f.target,m=y.node,p=i.parameters!==void 0?i.parameters[g.input]:g.input,M=i.parameters!==void 0?i.parameters[g.output]:g.output;y.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",p)),c.push(this.getDependency("accessor",M)),l.push(g),h.push(y))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(c),Promise.all(l),Promise.all(h)]).then(function(d){const u=d[0],f=d[1],g=d[2],y=d[3],m=d[4],p=[];for(let C=0,v=u.length;C<v;C++){const E=u[C],b=f[C],A=g[C],x=y[C],T=m[C];if(E===void 0)continue;E.updateMatrix&&E.updateMatrix();const P=n._createAnimationTracks(E,b,A,x,T);if(P)for(let D=0;D<P.length;D++)p.push(P[D])}const M=new sa(s,void 0,p);return Pn(M,i),M})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){const a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let c=0,l=i.weights.length;c<l;c++)o.morphTargetInfluences[c]=i.weights[c]}),a})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let l=0,h=o.length;l<h;l++)a.push(n.getDependency("node",o[l]));const c=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),c]).then(function(l){const h=l[0],d=l[1],u=l[2];u!==null&&h.traverse(function(f){f.isSkinnedMesh&&f.bind(u,pS)});for(let f=0,g=d.length;f<g;f++)h.add(d[f]);if(h.userData.pivot!==void 0&&d.length>0){const f=h.userData.pivot,g=d[0];h.pivot=new I().fromArray(f),h.position.x-=f[0],h.position.y-=f[1],h.position.z-=f[2],g.position.set(0,0,0),delete h.userData.pivot}return h})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],c=i._invokeOne(function(l){return l.createNodeMesh&&l.createNodeMesh(e)});return c&&o.push(c),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(l){return i._getNodeRef(i.cameraCache,s.camera,l)})),i._invokeAll(function(l){return l.createNodeAttachment&&l.createNodeAttachment(e)}).forEach(function(l){o.push(l)}),this.nodeCache[e]=Promise.all(o).then(function(l){let h;if(s.isBone===!0?h=new Ud:l.length>1?h=new wt:l.length===1?h=l[0]:h=new lt,h!==l[0])for(let d=0,u=l.length;d<u;d++)h.add(l[d]);if(s.name&&(h.userData.name=s.name,h.name=a),Pn(h,s),s.extensions&&wi(n,h,s),s.matrix!==void 0){const d=new ke;d.fromArray(s.matrix),h.applyMatrix4(d)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);if(!i.associations.has(h))i.associations.set(h,{});else if(s.mesh!==void 0&&i.meshCache.refs[s.mesh]>1){const d=i.associations.get(h);i.associations.set(h,{...d})}return i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,s=new wt;n.name&&(s.name=i.createUniqueName(n.name)),Pn(s,n),n.extensions&&wi(t,s,n);const a=n.nodes||[],o=[];for(let c=0,l=a.length;c<l;c++)o.push(i.getDependency("node",a[c]));return Promise.all(o).then(function(c){for(let h=0,d=c.length;h<d;h++){const u=c[h];u.parent!==null?s.add(ua(u)):s.add(u)}const l=h=>{const d=new Map;for(const[u,f]of i.associations)(u instanceof Mn||u instanceof St)&&d.set(u,f);return h.traverse(u=>{const f=i.associations.get(u);f!=null&&d.set(u,f)}),d};return i.associations=l(s),s})}_createAnimationTracks(e,t,n,i,s){const a=[],o=e.name?e.name:e.uuid,c=[];function l(f){f.morphTargetInfluences&&c.push(f.name?f.name:f.uuid)}ui[s.path]===ui.weights?(l(e),e.isGroup&&e.children.forEach(l)):c.push(o);let h;switch(ui[s.path]){case ui.weights:h=Zs;break;case ui.rotation:h=js;break;case ui.translation:case ui.scale:h=ia;break;default:switch(n.itemSize){case 1:h=Zs;break;case 2:case 3:default:h=ia;break}break}const d=i.interpolation!==void 0?cS[i.interpolation]:Ws,u=this._getArrayFromAccessor(n);for(let f=0,g=c.length;f<g;f++){const y=new h(c[f]+"."+ui[s.path],t.array,u,d);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(y),a.push(y)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=cc(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof js?oS:ru;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function gS(r,e,t){const n=e.attributes,i=new en;if(n.POSITION!==void 0){const o=t.json.accessors[n.POSITION],c=o.min,l=o.max;if(c!==void 0&&l!==void 0){if(i.set(new I(c[0],c[1],c[2]),new I(l[0],l[1],l[2])),o.normalized){const h=cc(as[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const s=e.targets;if(s!==void 0){const o=new I,c=new I;for(let l=0,h=s.length;l<h;l++){const d=s[l];if(d.POSITION!==void 0){const u=t.json.accessors[d.POSITION],f=u.min,g=u.max;if(f!==void 0&&g!==void 0){if(c.setX(Math.max(Math.abs(f[0]),Math.abs(g[0]))),c.setY(Math.max(Math.abs(f[1]),Math.abs(g[1]))),c.setZ(Math.max(Math.abs(f[2]),Math.abs(g[2]))),u.normalized){const y=cc(as[u.componentType]);c.multiplyScalar(y)}o.max(c)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;const a=new Gn;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function Gh(r,e,t){const n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(c){r.setAttribute(o,c)})}for(const a in n){const o=oc[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){const a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return qe.workingColorSpace!==tn&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${qe.workingColorSpace}" not supported.`),Pn(r,e),gS(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?hS(r,e.targets,t):r})}const Wc={Hit:.32,Death:.8},_S=.1,xS=4,vS=.35,SS=2.2;class yS{constructor(){w(this,"locomotionClip","Idle");w(this,"locomotionSpeed",0);w(this,"reactionClip");w(this,"reactionRemainingSeconds",0)}get activeClip(){return this.reactionClip??this.locomotionClip}get playbackRate(){return this.activeClip!=="Run"?1:Math.max(vS,Math.min(SS,this.locomotionSpeed/xS))}setLocomotion(e){this.locomotionSpeed=Math.max(0,e),this.locomotionClip=this.locomotionSpeed>_S?"Run":"Idle"}triggerReaction(e){this.reactionClip!=="Death"&&(this.reactionClip=e,this.reactionRemainingSeconds=Wc[e])}advance(e){!this.reactionClip||this.reactionClip==="Death"||(this.reactionRemainingSeconds=Math.max(0,this.reactionRemainingSeconds-e),this.reactionRemainingSeconds===0&&(this.reactionClip=void 0))}reset(){this.locomotionClip="Idle",this.locomotionSpeed=0,this.reactionClip=void 0,this.reactionRemainingSeconds=0}}const MS=2.34,ES=-.9,bS=2.025,lc=2.22,hc=-.9,TS=1.995,wS=2.5,AS=4.1,Hh="Muzzle_R",RS=-Math.PI/2,CS=-Math.PI/2;function ks(r,e){const t=r.x+e.z*hc+e.x*lc,n=r.z-e.x*hc+e.z*lc;return{x:t,z:n}}function Tn(r,e="cast-receive"){r.traverse(t=>{t instanceof Pe&&(t.castShadow=e==="cast"||e==="cast-receive",t.receiveShadow=e==="receive"||e==="cast-receive")})}const mn="./assets/humanoid/skinned-v2/",PS=["Idle","Run","Hit","Death"],Vh="WeaponSocket_R";class IS{constructor(e,t,n,i,s){w(this,"root");w(this,"scaleMultiplier");w(this,"muzzle");w(this,"mixer");w(this,"ownedMaterials");w(this,"actions",new Map);w(this,"animationState",new yS);w(this,"activeClip","Idle");w(this,"deathVariant","standard");w(this,"deathElapsedSeconds",0);w(this,"disposed",!1);this.root=e,this.scaleMultiplier=i,this.muzzle=n,this.ownedMaterials=s,this.mixer=new bm(e);for(const a of PS){const o=sa.findByName(t,a);if(!o)throw new Error(`Missing shared humanoid clip: ${a}`);this.actions.set(a,this.mixer.clipAction(o))}this.actions.get("Idle")?.play()}getMuzzleWorldPosition(e){return this.muzzle.getWorldPosition(e)}update(e,t){this.disposed||(this.animationState.setLocomotion(e),this.animationState.advance(t),this.syncActiveClip(),this.syncPlaybackRate(),this.mixer.update(t),this.updateDeathPose(t))}playDeath(e){this.disposed||(this.deathVariant=e,this.deathElapsedSeconds=0,this.animationState.triggerReaction("Death"),this.syncActiveClip())}playReaction(e){this.disposed||(this.animationState.triggerReaction(e),this.syncActiveClip())}dispose(){if(!this.disposed){this.disposed=!0,this.mixer.stopAllAction(),this.mixer.uncacheRoot(this.root);for(const e of this.ownedMaterials)e.dispose()}}syncActiveClip(){const e=this.animationState.activeClip;if(e===this.activeClip)return;this.actions.get(this.activeClip)?.fadeOut(.08);const t=this.actions.get(e);t&&(t.reset(),e==="Hit"||e==="Death"?(t.setLoop(Td,1),t.clampWhenFinished=!0):(t.setLoop(wd,1/0),t.clampWhenFinished=!1),t.fadeIn(.08).play(),this.activeClip=e)}updateDeathPose(e){if(this.activeClip!=="Death"){this.root.rotation.x=0;return}if(this.deathElapsedSeconds+=e,this.deathVariant==="back-fall"){const t=Math.min(1,this.deathElapsedSeconds/Wc.Death);this.root.rotation.x=-t*Math.PI/2}}syncPlaybackRate(){this.actions.get(this.activeClip)?.setEffectiveTimeScale(this.animationState.playbackRate)}}class LS{constructor(){w(this,"loader",new Vc);w(this,"characters",new Map);w(this,"weapons",new Map);w(this,"instances",new Set);w(this,"clips",[]);w(this,"animationAsset");w(this,"disposed",!1)}async load(){const e=await Promise.all([this.loader.loadAsync(`${mn}ramdo.glb`),this.loader.loadAsync(`${mn}zlol.glb`),this.loader.loadAsync(`${mn}officer.glb`),this.loader.loadAsync(`${mn}heavy.glb`),this.loader.loadAsync(`${mn}rpg.glb`),this.loader.loadAsync(`${mn}m16.glb`),this.loader.loadAsync(`${mn}ak47.glb`),this.loader.loadAsync(`${mn}gatling.glb`),this.loader.loadAsync(`${mn}luger.glb`),this.loader.loadAsync(`${mn}rocket_launcher.glb`),this.loader.loadAsync(`${mn}humanoid-v2.glb`)]);if(this.disposed){this.disposeAssets(e);return}const[t,n,i,s,a,o,c,l,h,d,u]=e;this.characters.set("ramdo",t),this.characters.set("zlol",n),this.characters.set("officer",i),this.characters.set("heavy",s),this.characters.set("rpg",a),this.weapons.set("m16",o),this.weapons.set("ak47",c),this.weapons.set("gatling",l),this.weapons.set("luger",h),this.weapons.set("rocket_launcher",d),this.animationAsset=u,this.clips=u.animations}create(e,t,n){if(this.disposed)return;const i=this.characters.get(e),s=this.weapons.get(t);if(!i||!s)return;const a=ua(i.scene),o=a.getObjectByName(Vh);if(!o)throw new Error(`${e}: missing ${Vh}`);const c=s.scene.clone(!0);c.rotation.z=RS;const l=c.getObjectByName("WeaponModel");l&&(l.rotation.x=CS);const h=c.getObjectByName(Hh);if(!h)throw new Error(`${t}: missing ${Hh}`);const d=[];n?.tintColor!==void 0&&this.cloneCharacterMaterials(a,new Ce(n.tintColor),d),o.add(c),Tn(a);const u=new IS(a,this.clips,h,n?.scaleMultiplier??1,d);return this.instances.add(u),u}disposeVisual(e){e.dispose(),this.instances.delete(e)}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.instances)e.dispose();this.instances.clear(),this.disposeLoadedAssets(),this.characters.clear(),this.weapons.clear(),this.clips=[]}}disposeLoadedAssets(){const e=[...this.characters.values(),...this.weapons.values()];this.animationAsset&&e.push(this.animationAsset),this.disposeAssets(e),this.animationAsset=void 0}disposeAssets(e){const t=new Set,n=new Set,i=new Set;for(const s of e)this.collectResources(s.scene,t,n,i);for(const s of t)s.dispose();for(const s of n)s.dispose();for(const s of i)s.dispose()}collectResources(e,t,n,i){if(e instanceof Pe)if(t.add(e.geometry),Array.isArray(e.material))for(const s of e.material)n.add(s),this.collectTextures(s,i);else n.add(e.material),this.collectTextures(e.material,i);for(const s of e.children)this.collectResources(s,t,n,i)}collectTextures(e,t){for(const n of Object.keys(e)){const i=e[n];i instanceof St&&t.add(i)}}cloneCharacterMaterials(e,t,n){if(e instanceof Pe){const i=[],s=Array.isArray(e.material)?e.material:[e.material];for(const a of s){const o=a.clone();this.applyTint(o,t),i.push(o),n.push(o)}Array.isArray(e.material)?e.material=i:e.material=i[0]??e.material}for(const i of e.children)this.cloneCharacterMaterials(i,t,n)}applyTint(e,t){"color"in e&&e.color instanceof Ce&&e.color.set(t),"emissive"in e&&e.emissive instanceof Ce&&e.emissive.copy(t).multiplyScalar(.12)}}class dc{static rotationYForDirection(e,t){return Math.atan2(e,t)}}function DS(r,e){return e||ln(r)?0:r==="drone"?2.5:r==="turret"?.5:.6}function NS(r,e){return e?1:r==="turret"?1.6:r==="heavy"?1.4:1}const FS={standard:{name:"standard",scaleMultiplier:1},red:{name:"red",scaleMultiplier:1,tintColor:16727368},largeRed:{name:"largeRed",scaleMultiplier:1.3,tintColor:16727368},large:{name:"large",scaleMultiplier:1.3,tintColor:3531629},small:{name:"small",scaleMultiplier:.7,tintColor:4034047}},US={grunt:"standard",gunner:"red",heavy:"large",raider:"large",sniper:"small",bomber:"largeRed"};function OS(r){const e=US[r];if(e)return{...FS[e]}}const Wh=.04;class au{constructor(){w(this,"flashes",new Map);w(this,"disposed",!1)}start(e,t){if(this.disposed)return;const n=this.flashes.get(e);if(n){n.expiresAt=t+Wh;return}const i=[];this.collectMaterials(e,i),this.flashes.set(e,{expiresAt:t+Wh,materials:i})}update(e){for(const[t,n]of this.flashes)e<n.expiresAt||(this.restoreFlash(n),this.flashes.delete(t))}clear(){for(const e of this.flashes.values())this.restoreFlash(e);this.flashes.clear()}dispose(){this.disposed||(this.disposed=!0,this.clear())}collectMaterials(e,t){if(e instanceof Pe){const n=e.material,i=Array.isArray(n)?n.map(s=>this.createFlashMaterial(s)):this.createFlashMaterial(n);e.material=i,t.push({flash:i,mesh:e,original:n})}for(const n of e.children)this.collectMaterials(n,t)}createFlashMaterial(e){const t=e.clone();return this.isEmissiveMaterial(t)?(t.color.set(16777215),t.emissive.set(16777215),t.emissiveIntensity=1,t):(this.isColorMaterial(t)&&t.color.set(16777215),t)}restoreFlash(e){for(const t of e.materials)t.mesh.material=t.original,this.disposeMaterial(t.flash)}disposeMaterial(e){if(Array.isArray(e)){for(const t of e)t.dispose();return}e.dispose()}isColorMaterial(e){return"color"in e&&e.color instanceof Ce}isEmissiveMaterial(e){return this.isColorMaterial(e)&&"emissive"in e&&e.emissive instanceof Ce&&"emissiveIntensity"in e}}const Xh=.05,Nr=.48;class BS{constructor(e,t){w(this,"projectileMeshes",new Map);w(this,"rocketSmokeEffects",[]);w(this,"rocketNextSmokeTimes",new Map);w(this,"projectileMuzzleWorldPosition",new I);w(this,"disposed",!1);this.scene=e,this.objectFactory=t}sync(e,t,n,i){for(const s of e.projectiles){const a=!this.projectileMeshes.has(s.id),o=s.position,c=this.getOrCreateProjectileMesh(s.id,s.kind),l=c.mesh;c.lastRenderedFrame=t;const h=this.isEnemyProjectile(s.kind)?this.getEnemyProjectileHeight(e,s.ownerEnemyId):bS;l.position.set(o.x,h,o.z);const d=this.isEnemyProjectile(s.kind)?this.getEnemyProjectileOwnerVisual(s.ownerEnemyId,i):n;a&&d&&(d.getMuzzleWorldPosition(this.projectileMuzzleWorldPosition),l.position.copy(this.projectileMuzzleWorldPosition));const u=Iv[s.kind];l.scale.set(1,1,u),l.rotation.y=Math.atan2(s.velocity.x,s.velocity.z),s.kind==="rocket"&&this.emitRocketSmoke(s.id,o,e.elapsedSeconds)}this.removeMissingMeshes(t),this.updateRocketSmoke(e)}resetView(){this.clearRocketSmoke()}resetLevel(){this.clearRocketSmoke(),this.clearTrackedMeshes()}dispose(){this.disposed||(this.disposed=!0,this.resetLevel())}getOrCreateProjectileMesh(e,t){const n=this.projectileMeshes.get(e);if(n)return n;const i=this.objectFactory.createProjectile(t);Tn(i);const s={lastRenderedFrame:0,mesh:i};return this.projectileMeshes.set(e,s),this.scene.add(i),s}isEnemyProjectile(e){return e==="enemy"||e==="enemy-grenade"}getEnemyProjectileHeight(e,t){const n=e.enemies.find(i=>i.id===t);return n?.kind==="drone"?wS:n?.kind==="boss_mech"?AS:TS}getEnemyProjectileOwnerVisual(e,t){if(e!==void 0)return t.get(e)}emitRocketSmoke(e,t,n){const i=this.rocketNextSmokeTimes.get(e);if(i===void 0){this.rocketNextSmokeTimes.set(e,n+Xh);return}if(n<i)return;const s=this.objectFactory.createRocketSmoke(t);this.scene.add(s),this.rocketSmokeEffects.push({expiresAt:n+Nr,mesh:s}),this.rocketNextSmokeTimes.set(e,n+Xh)}updateRocketSmoke(e){for(let t=this.rocketSmokeEffects.length-1;t>=0;t-=1){const n=this.rocketSmokeEffects[t];if(!n)continue;const i=n.mesh,s=Math.max(0,(n.expiresAt-e.elapsedSeconds)/Nr),a=1-s;i.material.opacity=s*.5,i.position.y=1+a*Nr*.45,i.scale.setScalar(1+a*Nr*.7),!(s>0)&&(this.scene.remove(i),i.material.dispose(),this.rocketSmokeEffects.splice(t,1))}for(const t of this.rocketNextSmokeTimes.keys())e.projectiles.some(i=>i.id===t&&i.kind==="rocket")||this.rocketNextSmokeTimes.delete(t)}clearRocketSmoke(){for(const e of this.rocketSmokeEffects)this.scene.remove(e.mesh),e.mesh.material.dispose();this.rocketSmokeEffects.length=0,this.rocketNextSmokeTimes.clear()}clearTrackedMeshes(){for(const e of this.projectileMeshes.values())this.scene.remove(e.mesh);this.projectileMeshes.clear()}removeMissingMeshes(e){for(const[t,n]of this.projectileMeshes)n.lastRenderedFrame!==e&&(this.scene.remove(n.mesh),this.projectileMeshes.delete(t))}}const so=1.55,qh=.14,Kh=.24,$h=.02,kS=1514012;class zS{constructor(e){w(this,"bars",new Map);w(this,"disposed",!1);this.scene=e}sync(e,t,n){if(this.disposed)return;const i=this.getOrCreate(e.id,t),s=this.getHealthRatio(e),a=Math.max(.02,so*s),o=t.position.y+i.topOffset;this.positionBar(i,e,o,a),this.updateColor(i.fill,s),i.back.userData.lastRenderedFrame=n,i.fill.userData.lastRenderedFrame=n}removeMissing(e){for(const[t,n]of this.bars)n.back.userData.lastRenderedFrame!==e&&this.removeBar(t,n)}reset(){for(const[e,t]of this.bars)this.removeBar(e,t)}dispose(){this.disposed||(this.disposed=!0,this.reset())}getOrCreate(e,t){const n=this.bars.get(e);if(n)return n;const i=this.createSprite(kS),s=this.createSprite(Xr.green);i.renderOrder=4,s.renderOrder=5,this.scene.add(i,s),t.updateWorldMatrix(!0,!0);const a=new en().setFromObject(t),o=Math.max(Kh,a.max.y-t.position.y+Kh),c={back:i,fill:s,topOffset:o};return this.bars.set(e,c),c}createSprite(e){const t=new Qr({color:e,depthTest:!1,depthWrite:!1,opacity:.96,transparent:!0}),n=new tc(t);return n.scale.set(so,qh,$h),n}getHealthRatio(e){return Math.max(0,Math.min(1,e.health/Math.max(1,e.maxHealth)))}positionBar(e,t,n,i){const s=t.position;e.back.position.set(s.x,n,s.z),e.fill.position.set(s.x-(so-i)/2,n,s.z),e.fill.scale.set(i,qh,$h)}updateColor(e,t){const n=nu(t);e.material.color.setHex(n)}removeBar(e,t){this.scene.remove(t.back,t.fill),t.back.material.dispose(),t.fill.material.dispose(),this.bars.delete(e)}}const GS={grunt:{character:"zlol",weapon:"ak47"},gunner:{character:"officer",weapon:"ak47"},heavy:{character:"heavy",weapon:"gatling"},raider:{character:"heavy",weapon:"gatling"},sniper:{character:"officer",weapon:"luger"},bomber:{character:"rpg",weapon:"rocket_launcher"}};function HS(r){return GS[r]}class VS{constructor(e,t,n,i){w(this,"loadRequests",new Set);w(this,"disposed",!1);this.scene=e,this.bossFactory=t,this.enemyKinds=n,this.enemyMeshes=i}requestAssets(e){for(const t of e.enemies){const n=this.authoredBossKindForEnemy(t.kind);!n||this.bossFactory.has(n)||this.loadBossAssets(n)}}async loadBossAssets(e){if(!(this.disposed||this.loadRequests.has(e))&&(this.loadRequests.add(e),await this.bossFactory.load(e),!this.disposed)){if(!this.bossFactory.has(e)){this.revealFallbackMeshes(e);return}this.replaceMeshes(e)}}createEnemyMesh(e){if(this.isAuthoredBoss(e))return this.bossFactory.create(e);if(e==="turret")return this.bossFactory.createSmallTank()}hideFallback(e,t){const n=this.authoredBossKindForEnemy(e);return n&&this.bossFactory.isLoading(n)&&(t.visible=!1),t}updateFacing(e,t,n,i){if(e==="turret"){t.name==="authored-turret"&&this.bossFactory.updateFacing("turret",t,n,i);return}this.isAuthoredBoss(e)&&this.isAuthoredBossMesh(t)&&this.bossFactory.updateFacing(e,t,n,i)}isAuthoredBoss(e){return e==="boss_tank"||e==="boss_mech"}isAuthoredBossMesh(e){return e.name==="authored-boss_tank"||e.name==="authored-boss_mech"||e.name==="authored-turret"}reset(){this.loadRequests.clear()}dispose(){this.disposed=!0,this.loadRequests.clear()}authoredBossKindForEnemy(e){if(e==="turret")return"boss_tank";if(this.isAuthoredBoss(e))return e}revealFallbackMeshes(e){for(const[t,n]of this.enemyKinds){if(this.authoredBossKindForEnemy(n)!==e)continue;const i=this.enemyMeshes.get(t);i&&(i.mesh.visible=!0)}}replaceMeshes(e){for(const[t,n]of this.enemyKinds){const i=this.enemyMeshes.get(t),s=this.createAuthoredMesh(e,n);!i||!s||(this.scene.remove(i.mesh),Tn(s),this.scene.add(s),this.enemyMeshes.set(t,{...i,mesh:s}))}}createAuthoredMesh(e,t){if(t==="turret"&&e==="boss_tank")return this.bossFactory.createSmallTank();if(t===e)return this.bossFactory.create(e)}}const WS=.12,XS=4.5,qS=2.2;class KS{constructor(e,t){w(this,"meshes",new Map);w(this,"renderFrame",0);this.scene=e,this.objectFactory=t}sync(e,t){this.renderFrame=t;for(const n of e.pickups){const i=this.getOrCreateMesh(n.id,n.kind);i.lastRenderedFrame=this.renderFrame;const s=Math.sin(n.ageSeconds*XS+n.id)*WS;i.mesh.position.set(n.position.x,wv+s,n.position.z),i.mesh.rotation.y=n.ageSeconds*qS}this.removeMissingMeshes()}reset(){this.clearMeshes()}dispose(){this.clearMeshes()}getOrCreateMesh(e,t){const n=this.meshes.get(e);if(n)return n;const i=this.objectFactory.createPickup(t);Tn(i);const s={lastRenderedFrame:0,mesh:i};return this.meshes.set(e,s),this.scene.add(i),s}removeMissingMeshes(){for(const[e,t]of this.meshes)t.lastRenderedFrame!==this.renderFrame&&(this.scene.remove(t.mesh),this.meshes.delete(e))}clearMeshes(){for(const e of this.meshes.values())this.scene.remove(e.mesh);this.meshes.clear()}}const Yh="Humanoid assets could not load; using primitive visuals.";class $S{constructor(e,t,n,i,s){w(this,"deadEnemyVisuals",new Map);w(this,"enemyVisuals",new Map);w(this,"enemyMeshes",new Map);w(this,"enemyKinds",new Map);w(this,"hitFlash",new au);w(this,"healthBars");w(this,"projectilePresenter");w(this,"bossPresenter");w(this,"pickupPresenter");w(this,"playerVisual");w(this,"renderFrame",0);w(this,"disposed",!1);this.scene=e,this.objectFactory=t,this.humanoidFactory=n,this.obstaclePresenter=s,this.projectilePresenter=new BS(e,t),this.healthBars=new zS(e),this.bossPresenter=new VS(e,i,this.enemyKinds,this.enemyMeshes),this.pickupPresenter=new KS(e,t)}get hasPlayerVisual(){return this.playerVisual!==void 0}async loadHumanoids(){try{if(await this.humanoidFactory.load(),this.disposed)return;this.clearHumanoidVisuals(),this.playerVisual=this.createHumanoidSafely("ramdo","m16"),this.playerVisual&&(this.playerVisual.root.scale.setScalar(ac),this.scene.add(this.playerVisual.root)),this.clearTrackedMeshes(this.enemyMeshes)}catch(e){console.warn(Yh,e)}}updatePlayer(e,t,n){if(!this.playerVisual)return;const i=this.playerVisual,s=e.player,a=s.position,o=i.root;o.position.set(a.x,0,a.z),o.visible=this.isPlayerVisible(e);const c=Math.hypot(s.velocity.x,s.velocity.z),l=t.x-a.x,h=t.z-a.z;Math.hypot(l,h)>.01&&(o.rotation.y=dc.rotationYForDirection(l,h)),i.update(c,n)}sync(e,t,n){this.bossPresenter.requestAssets(e),this.renderFrame=n,this.syncEnemies(e,t),this.syncDeadEnemyVisuals(e,t),this.obstaclePresenter.sync(e,this.renderFrame),this.pickupPresenter.sync(e,this.renderFrame),this.projectilePresenter.sync(e,this.renderFrame,this.playerVisual,this.enemyVisuals),this.hitFlash.update(e.elapsedSeconds)}async loadBossAssets(e){await this.bossPresenter.loadBossAssets(e)}playEnemyHit(e,t){this.enemyVisuals.get(e)?.playReaction("Hit");const n=this.enemyMeshes.get(e);n&&this.hitFlash.start(n.mesh,t)}playObstacleHit(e,t){this.obstaclePresenter.playHit(e,t)}playPlayerHit(){this.playerVisual?.playReaction("Hit")}startEnemyDeath(e,t,n){this.enemyKinds.delete(e);const i=this.enemyVisuals.get(e),s=this.enemyMeshes.get(e);!i||!s||(i.playDeath(n),this.enemyVisuals.delete(e),this.enemyMeshes.delete(e),this.deadEnemyVisuals.set(e,{expiresAt:t+Wc.Death,mesh:s.mesh,visual:i}))}resetView(){this.projectilePresenter.resetView(),this.hitFlash.clear(),this.healthBars.reset(),this.clearEnemyVisuals(),this.clearDeadEnemyVisuals(),this.clearTrackedMeshes(this.enemyMeshes),this.enemyKinds.clear(),this.bossPresenter.reset()}resetLevel(){this.resetView(),this.obstaclePresenter.reset(),this.pickupPresenter.reset(),this.projectilePresenter.resetLevel()}dispose(){this.disposed||(this.disposed=!0,this.clearHumanoidVisuals(),this.hitFlash.dispose(),this.healthBars.dispose(),this.clearTrackedMeshes(this.enemyMeshes),this.enemyKinds.clear(),this.bossPresenter.dispose(),this.obstaclePresenter.dispose(),this.pickupPresenter.dispose(),this.projectilePresenter.dispose())}syncEnemies(e,t){for(const n of e.enemies){const i=this.getOrCreateEnemyMesh(n.id,n.kind,e.campaign.currentLevel),s=i.mesh,a=s.position,o=n.position,c=this.enemyVisuals.get(n.id),l=Math.hypot(o.x-a.x,o.z-a.z),h=i.lastRenderedFrame>0&&t>0?l/t:0;i.lastRenderedFrame=this.renderFrame;const d=DS(n.kind,c!==void 0);a.set(o.x,d,o.z);const u=NS(n.kind,c!==void 0),f=c?.scaleMultiplier??1;s.scale.setScalar(u*f*ac),this.updateEnemyFacing(s,c,n.kind,o,e.player.position),c?.update(h,t),this.healthBars.sync(n,s,this.renderFrame)}this.removeMissingMeshes(this.enemyMeshes),this.healthBars.removeMissing(this.renderFrame);for(const[n,i]of this.enemyVisuals)this.enemyMeshes.has(n)||(this.humanoidFactory.disposeVisual(i),this.enemyVisuals.delete(n))}syncDeadEnemyVisuals(e,t){for(const[n,i]of this.deadEnemyVisuals)i.visual.update(0,t),!(e.elapsedSeconds<i.expiresAt)&&(this.scene.remove(i.mesh),this.humanoidFactory.disposeVisual(i.visual),this.deadEnemyVisuals.delete(n))}getOrCreateEnemyMesh(e,t,n){const i=this.enemyMeshes.get(e);if(i)return i;this.enemyKinds.set(e,t);const s=this.bossPresenter.createEnemyMesh(t);if(s)return this.addTrackedMesh(this.enemyMeshes,e,s);const a=HS(t),o=a?void 0:OS(t);if(!a&&!o){const u=this.objectFactory.createEnemy(t,n);return this.addTrackedMesh(this.enemyMeshes,e,this.bossPresenter.hideFallback(t,u))}const c=a?.character??"zlol",l=a?.weapon??"ak47",h=this.createHumanoidSafely(c,l,o);if(h)return this.enemyVisuals.set(e,h),this.addTrackedMesh(this.enemyMeshes,e,h.root);const d=this.objectFactory.createEnemy(t,n);return this.addTrackedMesh(this.enemyMeshes,e,this.bossPresenter.hideFallback(t,d))}addTrackedMesh(e,t,n){Tn(n);const i={lastRenderedFrame:0,mesh:n};return e.set(t,i),this.scene.add(n),i}removeMissingMeshes(e){for(const[t,n]of e)n.lastRenderedFrame!==this.renderFrame&&(this.scene.remove(n.mesh),e.delete(t),e===this.enemyMeshes&&this.enemyKinds.delete(t))}updateEnemyFacing(e,t,n,i,s){const a=s.x-i.x,o=s.z-i.z;ln(n)&&!this.bossPresenter.isAuthoredBossMesh(e)&&(e.rotation.y=Math.atan2(-a,-o)),n==="turret"&&(e.name==="authored-turret"?this.bossPresenter.updateFacing(n,e,a,o):this.objectFactory.aimTurret(e,a,o)),this.bossPresenter.isAuthoredBoss(n)&&this.bossPresenter.isAuthoredBossMesh(e)&&this.bossPresenter.updateFacing(n,e,a,o),t&&(e.rotation.y=dc.rotationYForDirection(a,o))}isPlayerVisible(e){return e.player.invulnerableSeconds<=0||Math.floor(e.player.invulnerableSeconds*24)%2!==0}createHumanoidSafely(e,t,n){try{return this.humanoidFactory.create(e,t,n)}catch(i){console.warn(Yh,i);return}}clearTrackedMeshes(e){for(const t of e.values())this.scene.remove(t.mesh);e.clear()}clearHumanoidVisuals(){this.playerVisual&&(this.scene.remove(this.playerVisual.root),this.humanoidFactory.disposeVisual(this.playerVisual),this.playerVisual=void 0),this.clearEnemyVisuals(),this.clearDeadEnemyVisuals()}clearEnemyVisuals(){for(const e of this.enemyVisuals.values())this.scene.remove(e.root),this.humanoidFactory.disposeVisual(e);this.enemyVisuals.clear()}clearDeadEnemyVisuals(){for(const e of this.deadEnemyVisuals.values())this.scene.remove(e.mesh),this.humanoidFactory.disposeVisual(e.visual);this.deadEnemyVisuals.clear()}}const Zh={boss_tank:{sourceDirectory:"artwork/Models/Tank",format:"glb",license:"Paid Tripo license, as stated by the asset owner",upAxis:"Y",forwardAxis:"Z",fallback:"procedural",parts:[{path:"Tank/Tank_Hull.glb",role:"base",scale:6.5,position:[0,0,0],rotation:[0,0,0]},{path:"Tank/Tank_Turret.glb",role:"turret",scale:6.5,position:[0,1.45,.35],rotation:[0,0,0]}]},boss_mech:{sourceDirectory:"artwork/Models/Mech",format:"glb",license:"Paid Tripo license, as stated by the asset owner",upAxis:"Y",forwardAxis:"Z",fallback:"procedural",parts:[{path:"Mech/Mech_Leg.glb",scale:3,position:[-1.25,1.5,.35],rotation:[0,0,0]},{path:"Mech/Mech_Leg.glb",scale:3,position:[1.25,1.5,.35],rotation:[0,0,0]},{path:"Mech/Mech_Cockpit2.glb",scale:3,position:[0,3.5,0],rotation:[0,0,0]},{path:"Mech/Mech_Cockpit1.glb",scale:3,position:[0,5.8,-.15],rotation:[0,0,0]},{path:"Mech/Mech_Arm.glb",scale:3,position:[-2.2,3.75,-.15],rotation:[0,0,0]},{path:"Mech/Mech_Arm.glb",scale:3,position:[2.2,3.75,-.15],rotation:[0,Math.PI,0]}]}},YS="assets/bosses/",ZS=`./${YS}`;class jS{constructor(){w(this,"loader",new Vc);w(this,"assets",new Map);w(this,"loadedKinds",new Set);w(this,"loading",new Map);w(this,"disposed",!1)}async load(e){if(this.disposed||this.loadedKinds.has(e))return;const t=this.loading.get(e);if(t)return t;const n=this.loadDefinition(e);this.loading.set(e,n),await n,this.loading.delete(e)}has(e){return this.loadedKinds.has(e)}isLoading(e){return this.loading.has(e)}create(e){return this.createDefinition(e,1,`authored-${e}`)}createSmallTank(){return this.createDefinition("boss_tank",.42,"authored-turret")}updateFacing(e,t,n,i){const s=dc.rotationYForDirection(n,i);if(e==="boss_tank"||e==="turret"){t.rotation.y=0;const a=t.getObjectByName("turret");a&&(a.rotation.y=s);return}t.rotation.y=s}createDefinition(e,t,n){if(this.disposed||!this.loadedKinds.has(e))return;const i=new wt;i.name=n;for(const s of Zh[e].parts){const a=this.assets.get(s.path);if(!a)return;i.add(this.createPart(a,s,t))}return Tn(i),i}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.assets.values())this.disposeAsset(e);this.assets.clear(),this.loadedKinds.clear(),this.loading.clear()}}async loadDefinition(e){const t=Zh[e].parts,n=[...new Set(t.map(a=>a.path))],i=await Promise.allSettled(n.map(a=>this.loader.loadAsync(`${ZS}${a}`)));if(this.disposed){this.disposeResults(i);return}const s=new Map;for(let a=0;a<n.length;a+=1){const o=i[a],c=n[a];if(!o||!c||o.status!=="fulfilled"){this.disposeResults(i);return}s.set(c,o.value)}for(const[a,o]of s)this.assets.set(a,o);this.loadedKinds.add(e)}createPart(e,t,n){const i=ua(e.scene);return i.scale.setScalar(t.scale*n),t.role&&(i.name=t.role),i.position.set(t.position[0]*n,t.position[1]*n,t.position[2]*n),i.rotation.set(...t.rotation),i}disposeResults(e){for(const t of e)t.status==="fulfilled"&&this.disposeAsset(t.value)}disposeAsset(e){const t=new Set,n=new Set,i=new Set;e.scene.traverse(s=>{if(!(s instanceof Pe))return;t.add(s.geometry);const a=Array.isArray(s.material)?s.material:[s.material];for(const o of a)n.add(o),this.collectTextures(o,i)});for(const s of t)s.dispose();for(const s of n)s.dispose();for(const s of i)s.dispose()}collectTextures(e,t){for(const n of Object.keys(e)){const i=e[n];i instanceof St&&t.add(i)}}}function uc(r,e){if(!Array.isArray(r)||r.some(t=>typeof t!="string"||t.length===0))throw new Error(`${e} must be an array of non-empty strings`);return[...r]}function jh(r,e){if(r===void 0)return;const t=xn(r,e);if(!Number.isInteger(t)||t<0)throw new Error(`${e} must be a non-negative integer`);return t}function JS(r,e){if(r===void 0)return;const t=zn(r,e);if(!/^#[0-9a-fA-F]{6}$/.test(t))throw new Error(`${e} must be a six-digit hex color`);return t}function Xc(r,e,t){const n=zn(r,e);if(!t[n])throw new Error(`${e} is unknown: ${n}`);return n}function QS(r,e,t,n=!1){if(r===void 0){if(n)throw new Error(`${e} is required`);return t===void 0?"every-segment":"single"}const i=zn(r,e);if(!["single","every-segment","segment-range"].includes(i))throw new Error(`${e} is unknown: ${i}`);return i}function ey(r,e,t,n){if(r==="every-segment"&&(e!==void 0||t!==void 0))throw new Error(`${n} every-segment scope cannot define segment bounds`);if(r==="single"&&e===void 0)throw new Error(`${n} single scope requires segment`);if(r==="segment-range"){if(e===void 0||t===void 0)throw new Error(`${n} segment-range scope requires segment and segmentEnd`);if(t<e)throw new Error(`${n}.segmentEnd must be greater than or equal to segment`)}}function ty(r,e,t,n){if(r===void 0&&!n)return ay(t);const i=zn(r,e);if(!["character-skin","weapon","static-prop","interactive-prop","scenery","terrain-obstacle"].includes(i))throw new Error(`${e} is unknown: ${i}`);return i}function ny(r,e,t){if(r===void 0&&!t)return{x:0,y:0,z:0};const n=Ot(r,e);return{x:xn(n.x,`${e}.x`),y:xn(n.y,`${e}.y`),z:xn(n.z,`${e}.z`)}}function iy(r,e,t){if(r===void 0&&!t)return"clone";const n=zn(r,e);if(!["unique","clone","instanced"].includes(n))throw new Error(`${e} is unknown: ${n}`);return n}function sy(r,e,t){if(r===void 0&&!t)return"cast-receive";const n=zn(r,e);if(!["none","cast","receive","cast-receive"].includes(n))throw new Error(`${e} is unknown: ${n}`);return n}function ry(r,e,t){if(r===void 0&&!t)return[];if(!Array.isArray(r)||r.some(n=>typeof n!="string"||n.length===0))throw new Error(`${e} must be an array of non-empty strings`);return[...r]}function ay(r){return r==="fieldRadio"||r==="crate"||r==="oilDrum"?"interactive-prop":r==="v2MediumRock"||r==="v2WoodenPalisade"?"terrain-obstacle":"scenery"}function Ot(r,e){if(typeof r!="object"||r===null||Array.isArray(r))throw new Error(`${e} must be an object`);return r}function zn(r,e){if(typeof r!="string"||r.length===0)throw new Error(`${e} must be a non-empty string`);return r}function xn(r,e){if(typeof r!="number"||!Number.isFinite(r))throw new Error(`${e} must be a finite number`);return r}function ni(r,e){const t=xn(r,e);if(t<=0)throw new Error(`${e} must be greater than zero`);return t}function oy(r,e){const t=ni(r,e);if(!Number.isInteger(t))throw new Error(`${e} must be an integer`);return t}const fa=["jungle-front","desert-refinery","frozen-fortress"],pa=["tree","barrel","rock","crate","roadblock"];function ro(r){return pa.includes(r)}function cy(r){if(r===void 0)return{laneMarginX:2.5,gap:1};const e=Ot(r,"scenery catalog.placementSafety");return{laneMarginX:ni(e.laneMarginX,"scenery catalog.placementSafety.laneMarginX"),gap:ni(e.gap,"scenery catalog.placementSafety.gap")}}function ly(r,e){if(r.obstacleAssetKindsByLevel===void 0)return{};const t=Ot(r.obstacleAssetKindsByLevel,"scenery catalog.obstacleAssetKindsByLevel"),n={};for(const[i,s]of Object.entries(t)){if(!fa.includes(i))throw new Error(`scenery catalog.obstacleAssetKindsByLevel contains unknown level: ${i}`);const a=Ot(s,`scenery catalog.obstacleAssetKindsByLevel.${i}`),o={};for(const[c,l]of Object.entries(a)){if(!pa.includes(c))throw new Error(`scenery catalog.obstacleAssetKindsByLevel.${i} contains unknown obstacle kind: ${c}`);o[c]=Xc(l,`scenery catalog.obstacleAssetKindsByLevel.${i}.${c}`,e)}n[i]=o}return n}function hy(r){if(r.obstacleAssetScalesByLevel===void 0)return{};const e=Ot(r.obstacleAssetScalesByLevel,"scenery catalog.obstacleAssetScalesByLevel"),t={};for(const[n,i]of Object.entries(e)){if(!fa.includes(n))throw new Error(`scenery catalog.obstacleAssetScalesByLevel contains unknown level: ${n}`);const s=Ot(i,`scenery catalog.obstacleAssetScalesByLevel.${n}`),a={};for(const[o,c]of Object.entries(s)){if(!pa.includes(o))throw new Error(`scenery catalog.obstacleAssetScalesByLevel.${n} contains unknown obstacle kind: ${o}`);a[o]=ni(c,`scenery catalog.obstacleAssetScalesByLevel.${n}.${o}`)}t[n]=a}return t}function dy(r,e){const t=Ot(r.obstacleAssetKinds,"scenery catalog.obstacleAssetKinds"),n=Ot(r.obstacleAssetScales,"scenery catalog.obstacleAssetScales"),i={},s={};for(const a of pa)i[a]=Xc(t[a],`scenery catalog.obstacleAssetKinds.${a}`,e),s[a]=ni(n[a],`scenery catalog.obstacleAssetScales.${a}`);return{kinds:i,scales:s}}function uy(r,e={}){const t=Ot(r,"scenery catalog"),n=Ot(t.assets,"scenery catalog.assets"),i={};for(const[u,f]of Object.entries(n)){if(u.length===0)throw new Error("scenery catalog.assets contains an empty asset ID");const g=Ot(f,`scenery catalog.assets.${u}`);i[u]=my(u,g,e.requireMetadata===!0)}const s=Ot(t.levels,"scenery catalog.levels"),a=fy(t.setPieces,i,e.requirePlacementScopes===!0),o=py(t.profiles,e.requireProfiles===!0),c={},l=new Set;for(const u of fa)c[u]=gy(s[u],`scenery catalog.levels.${u}`,i,l,a,e.requirePlacementScopes===!0);const h=Ot(t.jungleBorder,"scenery catalog.jungleBorder"),d=dy(t,i);return{assets:i,obstacleAssetKinds:d.kinds,obstacleAssetKindsByLevel:ly(t,i),obstacleAssetScales:d.scales,obstacleAssetScalesByLevel:hy(t),placementSafety:cy(t.placementSafety),levels:c,profiles:o,setPieces:a,jungleBorder:{x:xn(h.x,"scenery catalog.jungleBorder.x"),runCount:oy(h.runCount,"scenery catalog.jungleBorder.runCount"),rotationY:xn(h.rotationY,"scenery catalog.jungleBorder.rotationY"),scale:ni(h.scale,"scenery catalog.jungleBorder.scale")}}}function fy(r,e,t){if(r===void 0)return{};const n=Ot(r,"scenery catalog.setPieces"),i={};for(const[s,a]of Object.entries(n)){if(s.length===0)throw new Error("scenery catalog.setPieces contains an empty ID");i[s]=fc(a,`scenery catalog.setPieces.${s}`,e,new Set,t)}return i}function py(r,e){if(r===void 0){if(e)throw new Error("scenery catalog.profiles is required");return{}}const t=Ot(r,"scenery catalog.profiles"),n={};for(const i of fa){const s=t[i];if(s===void 0){if(e)throw new Error(`scenery catalog.profiles.${i} is required`);continue}const a=Ot(s,`scenery catalog.profiles.${i}`);n[i]={theme:zn(a.theme,`scenery catalog.profiles.${i}.theme`),palette:zn(a.palette,`scenery catalog.profiles.${i}.palette`),sceneryFamilies:uc(a.sceneryFamilies,`scenery catalog.profiles.${i}.sceneryFamilies`),obstacleFamilies:uc(a.obstacleFamilies,`scenery catalog.profiles.${i}.obstacleFamilies`),pacingTarget:ni(a.pacingTarget,`scenery catalog.profiles.${i}.pacingTarget`)}}return n}function my(r,e,t){const n=`scenery catalog.assets.${r}`;return{path:zn(e.path,`${n}.path`),targetHeight:ni(e.targetHeight,`${n}.targetHeight`),category:ty(e.category,`${n}.category`,r,t),anchor:ny(e.anchor,`${n}.anchor`,t),renderMode:iy(e.renderMode,`${n}.renderMode`,t),shadowPolicy:sy(e.shadowPolicy,`${n}.shadowPolicy`,t),tags:ry(e.tags,`${n}.tags`,t),tint:JS(e.tint,`${n}.tint`)}}function gy(r,e,t,n,i,s){if(Array.isArray(r))return fc(r,e,t,n,s);const a=Ot(r,e),o=uc(a.setPieces,`${e}.setPieces`),c=[];for(const h of o){const d=i[h];if(!d)throw new Error(`${e}.setPieces references unknown set piece: ${h}`);for(const u of d)c.push({...u,id:`${h}.${u.id}`})}const l=a.placements;if(!Array.isArray(l))throw new Error(`${e}.placements must be an array`);return c.push(...l),fc(c,e,t,n,s)}function fc(r,e,t,n,i){if(!Array.isArray(r))throw new Error(`${e} must be an array`);return r.map((a,o)=>{const c=Ot(a,`${e}[${o}]`),l=Xc(c.kind,`${e}[${o}].kind`,t),h=zn(c.id,`${e}[${o}].id`);if(n.has(h))throw new Error(`duplicate placement id across levels: ${h}`);n.add(h);const d=jh(c.segment,`${e}[${o}].segment`),u=jh(c.segmentEnd,`${e}[${o}].segmentEnd`),f=QS(c.scope,`${e}[${o}].scope`,d,i);return ey(f,d,u,`${e}[${o}]`),{id:h,kind:l,x:xn(c.x,`${e}[${o}].x`),y:xn(c.y,`${e}[${o}].y`),z:xn(c.z,`${e}[${o}].z`),scale:ni(c.scale,`${e}[${o}].scale`),rotationY:xn(c.rotationY,`${e}[${o}].rotationY`),scope:f,segment:d,segmentEnd:u}})}const _y={tree:2.5,rock:1,crate:.75,wall:.85,barrel:.8,wreck:.5,roadblock:.55,bunker:1};class xy{constructor(e,t,n){w(this,"authoredObstacleMeshes",new Map);w(this,"obstacleMeshes",new Map);w(this,"hitFlash",new au);this.scene=e,this.objectFactory=t,this.config=n}sync(e,t){this.hitFlash.update(e.elapsedSeconds);const n=new Set;for(const i of e.obstacles){if(i.presentationId){const o=this.config.getAuthoredPropMesh(i.presentationId);if(o){this.removeTrackedMesh(i.id),this.authoredObstacleMeshes.set(i.id,o),n.add(i.id);continue}}const s=this.getOrCreateObstacleMesh(i.id,i.kind,e.campaign.currentLevel);s.lastRenderedFrame=t;const a=s.grounded?0:_y[i.kind];s.mesh.position.set(i.position.x,a,i.position.z)}for(const i of this.authoredObstacleMeshes.keys())n.has(i)||this.authoredObstacleMeshes.delete(i);this.removeMissingMeshes(t)}playHit(e,t){const n=this.obstacleMeshes.get(e),i=this.authoredObstacleMeshes.get(e),s=n?.mesh??i;s&&this.hitFlash.start(s,t)}reset(){this.hitFlash.clear(),this.clearTrackedMeshes(),this.authoredObstacleMeshes.clear()}dispose(){this.reset(),this.hitFlash.dispose()}getOrCreateObstacleMesh(e,t,n){const i=this.obstacleMeshes.get(e);if(i)return i;const s=this.getSceneryObstacleMesh(t,n);return s?this.addTrackedMesh(e,s,!0):this.addTrackedMesh(e,this.objectFactory.createObstacle(t,n))}getSceneryObstacleMesh(e,t){if(!ro(e))return;const n=this.getObstacleAssetKind(e,t),i=this.getObstacleAssetScale(e,t);return this.config.getSceneryAssetMesh(n,i)}getObstacleAssetScale(e,t){return ro(e)?this.config.obstacleAssetScalesByLevel[t]?.[e]??this.config.obstacleAssetScales[e]:this.config.obstacleAssetScales.rock}getObstacleAssetKind(e,t){return ro(e)?this.config.obstacleAssetKindsByLevel[t]?.[e]??this.config.obstacleAssetKinds[e]:this.config.obstacleAssetKinds.rock}addTrackedMesh(e,t,n=!1){Tn(t);const i={grounded:n,lastRenderedFrame:0,mesh:t};return this.obstacleMeshes.set(e,i),this.scene.add(t),i}removeTrackedMesh(e){const t=this.obstacleMeshes.get(e);t&&(this.scene.remove(t.mesh),this.obstacleMeshes.delete(e))}removeMissingMeshes(e){for(const[t,n]of this.obstacleMeshes)n.lastRenderedFrame!==e&&(this.scene.remove(n.mesh),this.obstacleMeshes.delete(t))}clearTrackedMeshes(){for(const e of this.obstacleMeshes.values())this.scene.remove(e.mesh);this.obstacleMeshes.clear()}}const vy={};function ou(r,e){return`${r}:${e}`}function cu(r,e,t,n){const i=r??"every-segment";if(i==="every-segment")return!0;if(i==="single")return e===n;const s=t??e;return e!==void 0&&s!==void 0&&n>=e&&n<=s}class qc{constructor(e,t,n){w(this,"interactableMeshes",new Map);w(this,"collectedInteractables",new Set);w(this,"radioMeshes",new Map);this.assetFactory=e,this.placements=t,this.route=n}addToSegment(e,t){const n=[];for(const i of this.placements){if(!cu(i.scope,i.segment,i.segmentEnd,t))continue;const s=ou(i.id,t);if(this.collectedInteractables.has(s))continue;const a=this.assetFactory.create(i.kind,i.scale);!a||!this.placeProp(a,i,n)||((i.kind==="crate"||i.kind==="fieldRadio")&&this.interactableMeshes.set(s,a),i.kind==="fieldRadio"&&(a.userData.radioBaseY=i.y,a.userData.radioBaseRotationY=i.rotationY,this.radioMeshes.set(s,a)),e.add(a))}}hasRenderablePlacements(){return this.placements.some(e=>this.assetFactory.has(e.kind))}update(e){for(const[t,n]of this.radioMeshes){const i=n.userData.radioBaseY,s=e*Rv+t.length;n.position.y=i+Pv+Math.sin(s)*Av;const a=n.userData.radioBaseRotationY;n.rotation.y=a+e*Cv}}getInteractableMesh(e){return this.interactableMeshes.get(e)}collectInteractable(e){const t=this.interactableMeshes.get(e);t&&(t.removeFromParent(),this.interactableMeshes.delete(e),this.radioMeshes.delete(e)),this.collectedInteractables.add(e)}removeSegment(e){const t=`:${e}`;for(const n of this.interactableMeshes.keys())n.endsWith(t)&&(this.interactableMeshes.delete(n),this.radioMeshes.delete(n))}addBorderFence(e,t){if(!this.assetFactory.has("chainFence"))return!1;const n=this.route.segmentLength/t.runCount;for(const i of[-1,1])for(let s=0;s<t.runCount;s+=1){const a=this.assetFactory.create("chainFence",t.scale);if(!a)return!1;a.position.set(i*t.x,0,-this.route.segmentLength/2+n/2+s*n),a.rotation.y=t.rotationY,e.add(a)}return!0}placeProp(e,t,n){if(e.position.set(t.x,t.y,t.z),e.rotation.y=t.rotationY,!this.assetFactory.isSideDressing(t.kind))return!0;this.keepSideDressingOutsideLane(e,t);const i=this.getPlacementBounds(t,e.position.x);return i?this.overlapsSideDressing(i,n)?!1:(n.push(i),!0):!0}keepSideDressingOutsideLane(e,t){const n=Math.sign(t.x);if(n===0)return;const i=e.position,s=this.getPlacementBounds(t,i.x);if(!s)return;let a=this.route.playableMinX-this.route.sideDressingLaneMarginX;n>0&&(a=this.route.playableMaxX+this.route.sideDressingLaneMarginX),n>0&&s.min.x<a&&(i.x+=a-s.min.x),n<0&&s.max.x>a&&(i.x-=s.max.x-a)}getPlacementBounds(e,t){return this.assetFactory.getHorizontalBounds(e.kind,e.scale,e.rotationY,t,e.z)}overlapsSideDressing(e,t){for(const n of t)if(this.overlapsHorizontal(e,n))return!0;return!1}overlapsHorizontal(e,t){const n=this.route.sideDressingGap;return e.min.x-n<=t.max.x&&e.max.x+n>=t.min.x&&e.min.z-n<=t.max.z&&e.max.z+n>=t.min.z}}const Kc=96,lu=8,Sy=22,yy=18,My=20.7,Ey=20,ao=19,by=21,Ty=20,$c=38,wy=.65,Ay=.03,Ry=9,Cy=6.2,oo=12,Py=["desertCactus01","desertCactus02","desertCactus03"];class Iy{constructor(e,t,n,i){w(this,"groundGeometry",new En(Kc,1));w(this,"groundMaterial",new ve({color:11108169,roughness:1}));w(this,"roadGeometry",new En($c,1));w(this,"roadMaterial",new ve({color:13675890,roughness:1}));w(this,"trackGeometry",new st(wy,Ay,Ry));w(this,"trackMaterial",new ve({color:11831125,roughness:1}));w(this,"scrubGeometry",new gi(.1,.18,2.8,5));w(this,"scrubMaterial",new ve({color:6910267,roughness:1}));w(this,"segmentGroups",new Map);w(this,"transform",new lt);w(this,"propStreamer");w(this,"disposed",!1);this.scene=e,this.assetFactory=t,this.route=i,this.propStreamer=new qc(t,n,i)}sync(e){for(const[t,n]of this.segmentGroups)e.includes(t)||(this.removeSegment(n),this.segmentGroups.delete(t));for(const t of e){if(this.segmentGroups.has(t))continue;const n=this.createSegment(t);this.segmentGroups.set(t,n),this.scene.add(n)}}update(e){this.propStreamer.update(e)}dispose(){this.disposed||(this.disposed=!0,this.sync([]),this.groundGeometry.dispose(),this.groundMaterial.dispose(),this.roadGeometry.dispose(),this.roadMaterial.dispose(),this.trackGeometry.dispose(),this.trackMaterial.dispose(),this.scrubGeometry.dispose(),this.scrubMaterial.dispose())}getInteractableMesh(e){return this.propStreamer.getInteractableMesh(e)}collectInteractable(e){this.propStreamer.collectInteractable(e)}createSegment(e){const t=new wt;return t.position.z=this.route.originZ-this.route.segmentLength/2-e*this.route.segmentLength,t.add(this.createPlane(this.groundGeometry,this.groundMaterial,0)),t.add(this.createPlane(this.roadGeometry,this.roadMaterial,.015)),this.addTracks(t),this.shouldUseProceduralScrub()&&this.addScrub(t,e),Tn(t),this.propStreamer.addToSegment(t,e),t}createPlane(e,t,n){const i=new Pe(e,t);return i.rotation.x=-Math.PI/2,i.position.y=n,i.scale.y=this.route.segmentLength,i}addTracks(e){const t=new Jt(this.trackGeometry,this.trackMaterial,oo),n=oo/2,i=this.route.segmentLength/n;for(let s=0;s<oo;s+=1){const a=s%2===0?-1:1,o=Math.floor(s/2);this.transform.position.set(a*Cy,.035,-this.route.segmentLength/2+i*(o+.5)),this.transform.rotation.set(0,0,0),this.transform.scale.setScalar(1),this.transform.updateMatrix(),t.setMatrixAt(s,this.transform.matrix)}t.instanceMatrix.needsUpdate=!0,e.add(t)}addScrub(e,t){const n=new Jt(this.scrubGeometry,this.scrubMaterial,ao),i=new Jt(this.scrubGeometry,this.scrubMaterial,ao*2);for(let s=0;s<ao;s+=1){const o=(s%2===0?-1:1)*(by+(s*7+t*3)%Ty),c=-36+(s*17+t*11)%72,l=.65+(s+t)%4*.1;this.transform.position.set(o,1.4*l,c),this.transform.rotation.set(0,0,0),this.transform.scale.setScalar(l),this.transform.updateMatrix(),n.setMatrixAt(s,this.transform.matrix);for(let h=0;h<2;h+=1)this.transform.position.set(o+(h===0?-.5:.5)*l,2.1*l,c),this.transform.rotation.set(0,0,h===0?-.65:.65),this.transform.scale.setScalar(.55*l),this.transform.updateMatrix(),i.setMatrixAt(s*2+h,this.transform.matrix)}n.instanceMatrix.needsUpdate=!0,i.instanceMatrix.needsUpdate=!0,e.add(n,i)}shouldUseProceduralScrub(){return!Py.some(e=>this.assetFactory.has(e))}removeSegment(e){const t=this.getSegmentIndex(e);this.propStreamer.removeSegment(t),this.scene.remove(e);for(const n of e.children)n instanceof Jt&&n.dispose()}getSegmentIndex(e){const n=this.route.originZ-this.route.segmentLength/2-e.position.z;return Math.round(n/this.route.segmentLength)}}const Jh=14,Ly=22,Dy=22;class Ny{constructor(e,t,n,i){w(this,"groundGeometry",new En(Kc,1));w(this,"groundMaterial",new ve({color:7310754,roughness:1}));w(this,"roadGeometry",new En($c,1));w(this,"roadMaterial",new ve({color:12046556,roughness:.9}));w(this,"iceGeometry",new er(1.1,4.8,5));w(this,"iceMaterial",new ve({color:14217983,roughness:.45,metalness:.1}));w(this,"markerGeometry",new st(.7,.04,5));w(this,"markerMaterial",new ve({color:9351106,roughness:1}));w(this,"segmentGroups",new Map);w(this,"transform",new lt);w(this,"propStreamer");w(this,"disposed",!1);this.scene=e,this.route=i,this.propStreamer=new qc(t,n,i)}sync(e){for(const[t,n]of this.segmentGroups)e.includes(t)||(this.removeSegment(n),this.segmentGroups.delete(t));for(const t of e){if(this.segmentGroups.has(t))continue;const n=this.createSegment(t);this.segmentGroups.set(t,n),this.scene.add(n)}}update(e){this.propStreamer.update(e)}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.segmentGroups.values())this.removeSegment(e);this.segmentGroups.clear(),this.groundGeometry.dispose(),this.groundMaterial.dispose(),this.roadGeometry.dispose(),this.roadMaterial.dispose(),this.iceGeometry.dispose(),this.iceMaterial.dispose(),this.markerGeometry.dispose(),this.markerMaterial.dispose()}}getInteractableMesh(e){return this.propStreamer.getInteractableMesh(e)}collectInteractable(e){this.propStreamer.collectInteractable(e)}createSegment(e){const t=new wt;return t.position.z=this.route.originZ-this.route.segmentLength/2-e*this.route.segmentLength,t.add(this.createPlane(this.groundGeometry,this.groundMaterial,0)),t.add(this.createPlane(this.roadGeometry,this.roadMaterial,.015)),this.addRoadMarkers(t),this.addIceClusters(t,e),Tn(t),this.propStreamer.addToSegment(t,e),t}createPlane(e,t,n){const i=new Pe(e,t);return i.rotation.x=-Math.PI/2,i.position.y=n,i.scale.y=this.route.segmentLength,i}addRoadMarkers(e){const t=new Jt(this.markerGeometry,this.markerMaterial,6),i=this.route.segmentLength/3;for(let s=0;s<6;s+=1){const a=Math.floor(s/2),o=-this.route.segmentLength/2+i*(a+.5);this.transform.position.set(s%2===0?-6.2:6.2,.025,o),this.transform.rotation.set(-Math.PI/2,0,0),this.transform.scale.setScalar(1),this.transform.updateMatrix(),t.setMatrixAt(s,this.transform.matrix)}t.instanceMatrix.needsUpdate=!0,e.add(t)}addIceClusters(e,t){const n=new Jt(this.iceGeometry,this.iceMaterial,Jh);for(let i=0;i<Jh;i+=1){const a=(i%2===0?-1:1)*(Ly+(i*9+t*5)%Dy),o=this.route.segmentLength-8,c=-o/2+(i*17+t*11)%o,l=.65+(i+t)%4*.16;this.transform.position.set(a,2.4*l,c),this.transform.rotation.set(0,(i+t)*.35,0),this.transform.scale.setScalar(l),this.transform.updateMatrix(),n.setMatrixAt(i,this.transform.matrix)}n.instanceMatrix.needsUpdate=!0,e.add(n)}removeSegment(e){const t=this.getSegmentIndex(e);this.propStreamer.removeSegment(t),this.scene.remove(e)}getSegmentIndex(e){const n=this.route.originZ-this.route.segmentLength/2-e.position.z;return Math.round(n/this.route.segmentLength)}}const Qh=8,co=lu*2,lo=6,ed=8,ho=3;class Fy{constructor(e,t,n,i,s){w(this,"bushGeometry",new Ys(1.4,0));w(this,"bushMaterial",new ve({color:3562034,roughness:1}));w(this,"groundGeometry",new En(Kc,1));w(this,"groundMaterials",[new ve({color:3228968,roughness:1}),new ve({color:3492394,roughness:1}),new ve({color:3162918,roughness:1})]);w(this,"fencePostGeometry",new st(.28,2,.28));w(this,"fencePostMaterial",new ve({color:5850413,roughness:1}));w(this,"fenceRailGeometry",new st(.18,.18,1));w(this,"fenceRailMaterial",new ve({color:7099703,roughness:1}));w(this,"roadGeometry",new En($c,1));w(this,"roadMaterials",[new ve({color:6642243,roughness:1}),new ve({color:6313537,roughness:1}),new ve({color:6905157,roughness:1})]);w(this,"roadTrackGeometry",new En(.65,9));w(this,"roadTrackMaterial",new ve({color:5327677,roughness:1}));w(this,"segmentGroups",new Map);w(this,"treeCanopyGeometry",new er(2.3,7,6));w(this,"treeCanopyMaterials",[new ve({color:3303994,roughness:1}),new ve({color:3896640,roughness:1}),new ve({color:2974520,roughness:1})]);w(this,"treeTrunkGeometry",new gi(.22,.42,5,5));w(this,"treeTrunkMaterial",new ve({color:5784366,roughness:1}));w(this,"transform",new lt);w(this,"assetFactory");w(this,"propStreamer");w(this,"disposed",!1);this.scene=e,this.borderConfig=i,this.route=s,this.assetFactory=t,this.propStreamer=new qc(t,n,s)}sync(e){for(const[t,n]of this.segmentGroups)e.includes(t)||(this.removeSegment(n),this.segmentGroups.delete(t));for(const t of e){if(this.segmentGroups.has(t))continue;const n=this.createSegment(t);this.segmentGroups.set(t,n),this.scene.add(n)}}update(e){this.propStreamer.update(e)}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.segmentGroups.values())this.removeSegment(e);this.segmentGroups.clear(),this.bushGeometry.dispose(),this.bushMaterial.dispose(),this.groundGeometry.dispose(),this.disposeMaterials(this.groundMaterials),this.fencePostGeometry.dispose(),this.fencePostMaterial.dispose(),this.fenceRailGeometry.dispose(),this.fenceRailMaterial.dispose(),this.roadGeometry.dispose(),this.disposeMaterials(this.roadMaterials),this.roadTrackGeometry.dispose(),this.roadTrackMaterial.dispose(),this.treeCanopyGeometry.dispose(),this.disposeMaterials(this.treeCanopyMaterials),this.treeTrunkGeometry.dispose(),this.treeTrunkMaterial.dispose()}}getInteractableMesh(e){return this.propStreamer.getInteractableMesh(e)}collectInteractable(e){this.propStreamer.collectInteractable(e)}createSegment(e){const t=new wt;t.position.z=this.route.originZ-this.route.segmentLength/2-e*this.route.segmentLength;const n=this.getMaterialIndex(e),i=this.createPlane(this.groundGeometry,this.groundMaterials[n],0),s=this.createPlane(this.roadGeometry,this.roadMaterials[n],.015);return t.add(i,s),this.addFence(t),this.addRoadTracks(t),this.addFoliage(t,e,n),Tn(t),this.propStreamer.addToSegment(t,e),t}createPlane(e,t,n){const i=new Pe(e,t);return i.rotation.x=-Math.PI/2,i.position.y=n,i.scale.y=this.route.segmentLength,i}addFence(e){this.propStreamer.addBorderFence(e,this.borderConfig)||this.addProceduralFence(e)}addProceduralFence(e){const t=this.borderConfig.x,n=Math.floor(this.route.segmentLength/Qh)+1,i=new Jt(this.fencePostGeometry,this.fencePostMaterial,n*2);let s=0;for(const a of[-1,1]){for(let o=0;o<n;o+=1)this.transform.position.set(a*t,1,-this.route.segmentLength/2+o*Qh),this.transform.updateMatrix(),i.setMatrixAt(s,this.transform.matrix),s+=1;for(const o of[.6,1.5]){const c=new Pe(this.fenceRailGeometry,this.fenceRailMaterial);c.position.set(a*t,o,0),c.scale.z=this.route.segmentLength,e.add(c)}}i.instanceMatrix.needsUpdate=!0,e.add(i)}addRoadTracks(e){const t=new Jt(this.roadTrackGeometry,this.roadTrackMaterial,lo*2);let n=0;const i=this.route.segmentLength/lo;for(let s=0;s<lo;s+=1){const a=-this.route.segmentLength/2+i*(s+.5);for(const o of[-1,1])this.transform.position.set(o*6.2,.025,a),this.transform.rotation.set(-Math.PI/2,0,0),this.transform.updateMatrix(),t.setMatrixAt(n,this.transform.matrix),n+=1}this.transform.rotation.set(0,0,0),t.instanceMatrix.needsUpdate=!0,e.add(t)}addFoliage(e,t,n){if(this.assetFactory.didFinishLoading&&this.propStreamer.hasRenderablePlacements())return;const i=new Jt(this.treeTrunkGeometry,this.treeTrunkMaterial,co),s=new Jt(this.treeCanopyGeometry,this.treeCanopyMaterials[n],co),a=new Jt(this.bushGeometry,this.bushMaterial,co),o=this.transform,c=o.position,l=o.rotation,h=o.scale,d=o.matrix;let u=0;for(const f of[-1,1])for(let g=0;g<lu;g+=1){const y=(g*5+t*3)%yy,m=this.route.segmentLength-ed,p=(g*13+t*9)%m-this.route.segmentLength/2+ed/2,M=.8+(g+t)%4*.12;c.set(f*(Sy+y),2.5*M,p),h.setScalar(M),o.updateMatrix(),i.setMatrixAt(u,d),c.y=6.1*M,o.updateMatrix(),s.setMatrixAt(u,d),c.set(f*(My+(g*7+t)%Ey),.9,p+5),l.set(0,(g+t)*.4,0),h.set(1.2+g%3*.25,.8+t%3*.15,1.1),o.updateMatrix(),a.setMatrixAt(u,d),l.set(0,0,0),h.setScalar(1),u+=1}i.instanceMatrix.needsUpdate=!0,s.instanceMatrix.needsUpdate=!0,a.instanceMatrix.needsUpdate=!0,e.add(i,s,a)}disposeMaterials(e){for(const t of e)t.dispose()}getMaterialIndex(e){const t=(e%ho+ho)%ho;return t===0?0:t===1?1:2}removeSegment(e){const t=this.getSegmentIndex(e);this.propStreamer.removeSegment(t),this.scene.remove(e);for(const n of e.children)n instanceof Jt&&n.dispose()}getSegmentIndex(e){const t=this.route.originZ-this.route.segmentLength/2;return Math.round((t-e.position.z)/this.route.segmentLength)}}class Uy{constructor(e,t,n,i,s,a,o,c){w(this,"sceneryAssetFactory");w(this,"activeLevel");w(this,"scenery");w(this,"refreshPending",!1);w(this,"disposed",!1);this.scene=e,this.catalog=t,this.sceneryCatalog=n,this.entityPresenter=s,this.hemisphereLight=a,this.sunLight=o,this.resetView=c,this.sceneryAssetFactory=i,this.applyLevelTheme("jungle-front")}get currentScenery(){return this.scenery}shouldActivate(e){return e.campaign.currentLevel!==this.activeLevel||this.refreshPending}activate(e){this.scenery?.dispose(),this.scenery=void 0,this.entityPresenter.resetLevel(),this.resetView(e.player.position,!1),this.activeLevel=e.campaign.currentLevel,this.preloadBossForLevel(this.activeLevel),this.scenery=this.createScenery(this.activeLevel),this.refreshPending=!1,this.applyLevelTheme(this.activeLevel)}sync(e,t){this.scenery?.sync(e),this.scenery?.update(t)}async loadAssets(){try{await this.sceneryAssetFactory.load()}catch{this.refreshPending=!0;return}this.disposed||(this.refreshPending=!0)}requestRefresh(){this.refreshPending=!0}getInteractableMesh(e){return this.scenery?.getInteractableMesh(e)}dispose(){this.disposed=!0,this.scenery?.dispose(),this.sceneryAssetFactory.dispose()}createScenery(e){const t=this.getSceneryRoute(),n=this.sceneryCatalog.levels;return e==="jungle-front"?new Fy(this.scene,this.sceneryAssetFactory,n["jungle-front"]??[],this.sceneryCatalog.jungleBorder,t):e==="desert-refinery"?new Iy(this.scene,this.sceneryAssetFactory,n["desert-refinery"]??[],t):new Ny(this.scene,this.sceneryAssetFactory,n["frozen-fortress"]??[],t)}getSceneryRoute(){const e=this.catalog.player;return{originZ:e.maxZ,segmentLength:this.catalog.world.segmentLength,playableMinX:e.minX,playableMaxX:e.maxX,sideDressingLaneMarginX:this.sceneryCatalog.placementSafety.laneMarginX,sideDressingGap:this.sceneryCatalog.placementSafety.gap}}preloadBossForLevel(e){const t=this.authoredBossForLevel(e);t&&this.entityPresenter.loadBossAssets(t)}authoredBossForLevel(e){if(e==="jungle-front"||e==="desert-refinery")return"boss_tank";if(e==="frozen-fortress")return"boss_mech"}applyLevelTheme(e){const t=qr[e];this.scene.background=new Ce(t.backgroundColor),this.scene.fog=new Lc(t.backgroundColor,t.fogNear,t.fogFar),this.hemisphereLight.color.setHex(t.hemisphereSkyColor),this.hemisphereLight.groundColor.setHex(t.hemisphereGroundColor),this.sunLight.color.setHex(t.sunColor)}}const uo=.16,Oy=180;class By{constructor(){w(this,"pools",new Map);w(this,"flashGeometry",new Ci(1.15,12,10));w(this,"particleGeometry",new st(uo,uo,uo));w(this,"ringGeometry",new kc(.55,.9,32));w(this,"smokeGeometry",new Ci(.45,7,6));w(this,"disposed",!1);w(this,"totalPooled",0)}acquire(e,t,n,i){const s=`${e}:${String(t)}`,o=this.pools.get(s)?.pop();o&&(this.totalPooled-=1);const c=o??this.createMesh(e,t,n,i);return c.material.opacity=n,c.material.toneMapped=i,c.visible=!0,{key:s,mesh:c}}release(e,t){if(t.visible=!1,t.position.set(0,0,0),t.scale.setScalar(1),this.totalPooled>=Oy||this.disposed){t.material.dispose();return}const n=this.pools.get(e)??[];n.push(t),this.pools.set(e,n),this.totalPooled+=1}get pooledCount(){return this.totalPooled}dispose(){if(!this.disposed){this.disposed=!0;for(const e of this.pools.values())for(const t of e)t.material.dispose();this.pools.clear(),this.totalPooled=0,this.flashGeometry.dispose(),this.particleGeometry.dispose(),this.ringGeometry.dispose(),this.smokeGeometry.dispose()}}createMesh(e,t,n,i){const s=new jn({color:t,depthWrite:!1,opacity:n,toneMapped:i,transparent:!0});let a=this.particleGeometry;return e==="fireball"?a=this.flashGeometry:e==="ring"?a=this.ringGeometry:e==="smoke"&&(a=this.smokeGeometry),new Pe(a,s)}}const Fr={debris:80,lifetimeSeconds:2.4,total:180,smoke:40},ky=1.45,td=6,zy=1.8,Gy=16762992,Hy=4,nd=[16765802,15115851,9259817,4932672];class Vy{constructor(e){w(this,"effects",[]);w(this,"pool",new By);w(this,"disposed",!1);this.scene=e}addExplosion(e,t,n=16757574,i=.72){if(this.disposed)return;const s=Math.min(td,Math.max(1.2,t*ky*i));this.addFireballs(e,s,n),this.addExplosionDebris(e,s),this.addExplosionRings(e,s),this.addExplosionSmoke(e,s)}addBarrelExplosion(e,t){this.addExplosion(e,t,Gy,zy)}addHit(e,t=16773058){for(let n=0;n<Hy;n+=1){const i=new I(e.x,.9,e.z),s=new I(gn.randFloatSpread(4),1.5+Math.random()*3,gn.randFloatSpread(4)),a=.3+Math.random()*.2;this.addEffect({color:t,gravity:7,kind:"hit",lifeSeconds:a,opacity:1,position:i,startScale:1,targetScale:0,toneMapped:!0,velocity:s})}}addPickup(e,t){this.addHit(e,t),this.addRing(e,t,.72,.4,1.8)}update(e){const t=Math.max(0,Math.min(e,.05));for(let n=this.effects.length-1;n>=0;n-=1){const i=this.effects[n];if(!i)continue;i.lifeSeconds-=t,i.mesh.position.addScaledVector(i.velocity,t),i.velocity.y-=i.gravity*t;const s=Math.max(0,i.lifeSeconds/i.maxLifeSeconds);i.mesh.material.opacity=s*i.baseOpacity,this.updateScale(i,s),!(i.lifeSeconds>0)&&this.recycleEffect(n,i)}}getMetrics(){let e=0,t=0,n=0,i=0;for(const s of this.effects)s.kind==="debris"?e+=1:s.kind==="fireball"?t+=1:s.kind==="ring"?n+=1:s.kind==="smoke"&&(i+=1);return{active:this.effects.length,debris:e,fireballs:t,pooled:this.pool.pooledCount,shockwaves:n,smoke:i}}clear(){for(let e=this.effects.length-1;e>=0;e-=1){const t=this.effects[e];t&&this.recycleEffect(e,t)}}dispose(){this.disposed||(this.disposed=!0,this.clear(),this.pool.dispose())}addFireballs(e,t,n){const i=new I(e.x,.85,e.z),s=t*.32,a=new I(0,.9,0);this.addEffect({color:n,gravity:-.3,kind:"fireball",lifeSeconds:.34,opacity:.92,position:i,startScale:.7,targetScale:s,toneMapped:!1,velocity:a});const o=new I(e.x+.22,1,e.z-.12),c=t*.25,l=new I(0,.45,0);this.addEffect({color:16777165,gravity:-.1,kind:"fireball",lifeSeconds:.27,opacity:.88,position:o,startScale:.45,targetScale:c,toneMapped:!1,velocity:l});const h=new I(e.x-.2,1.08,e.z+.15),d=t*.16,u=new I(0,.2,0);this.addEffect({color:16777186,gravity:0,kind:"fireball",lifeSeconds:.18,opacity:.92,position:h,startScale:.28,targetScale:d,toneMapped:!1,velocity:u})}addExplosionDebris(e,t){const n=Math.round(7+t*1.2),i=Math.max(.55,t*.11);for(let s=0;s<n;s+=1){const a=nd[s%nd.length];if(a===void 0)continue;const o=this.offsetPosition(e,i,t),c=new I(gn.randFloatSpread(7),3+Math.random()*7,gn.randFloatSpread(7)).multiplyScalar(.6+t*.08),l=.62+Math.random()*.62,h=.8+Math.random()*.9;this.addEffect({color:a,gravity:10,kind:"debris",lifeSeconds:l,opacity:1,position:o,startScale:h,targetScale:0,toneMapped:!0,velocity:c})}}addExplosionRings(e,t){const n=td-1,i=Math.min(n,t*1.6),s=Math.min(n,t*2.2);this.addRing(e,16769656,.8,.45,i),this.addRing(e,16742957,.56,.58,s)}addExplosionSmoke(e,t){const n=Math.min(7,Math.round(3+t*.45));for(let i=0;i<n;i+=1){const s=i%2===0?7166793:4998204,a=new I(e.x+gn.randFloatSpread(t*.16),.75+Math.random()*1.1,e.z+gn.randFloatSpread(t*.16)),o=new I(gn.randFloatSpread(1.1),.9+Math.random()*1.3,gn.randFloatSpread(1.1)),c=1.35+Math.random()*.7,l=t*.35;this.addEffect({color:s,gravity:-.1,kind:"smoke",lifeSeconds:c,opacity:.38,position:a,startScale:.38,targetScale:l,toneMapped:!1,velocity:o})}}addRing(e,t,n,i,s){const a=new I(e.x,.07,e.z),o=new I;this.addEffect({color:t,gravity:0,kind:"ring",lifeSeconds:i,opacity:n,position:a,startScale:1,targetScale:s,toneMapped:!0,velocity:o})}addEffect(e){if(this.disposed||this.effects.length>=Fr.total||e.kind==="smoke"&&this.countKind("smoke")>=Fr.smoke||e.kind==="debris"&&this.countKind("debris")>=Fr.debris)return;const t=this.pool.acquire(e.kind,e.color,e.opacity,e.toneMapped),n=t.mesh;n.position.copy(e.position),n.scale.setScalar(e.startScale),e.kind==="ring"?n.rotation.x=-Math.PI/2:n.rotation.set(0,0,0),this.scene.add(n);const i=Math.min(e.lifeSeconds,Fr.lifetimeSeconds);this.effects.push({baseOpacity:e.opacity,gravity:e.gravity,kind:e.kind,lifeSeconds:i,maxLifeSeconds:i,mesh:n,poolKey:t.key,startScale:e.startScale,targetScale:e.targetScale,velocity:e.velocity})}offsetPosition(e,t,n){return new I(e.x+gn.randFloatSpread(t),.45+Math.random()*Math.max(1.1,n*.18),e.z+gn.randFloatSpread(t))}updateScale(e,t){const n=e.mesh.scale;if(e.kind==="ring"){n.setScalar(1+(1-t)*e.targetScale);return}if(e.kind==="smoke"||e.kind==="fireball"){n.setScalar(e.startScale+(1-t)*e.targetScale);return}n.setScalar(Math.max(.01,e.startScale*t))}countKind(e){let t=0;for(const n of this.effects)n.kind===e&&(t+=1);return t}recycleEffect(e,t){this.scene.remove(t.mesh),this.pool.release(t.poolKey,t.mesh),this.effects.splice(e,1)}}class Wy{constructor(e,t,n){w(this,"combatEffects");w(this,"lastEventId",0);w(this,"shakeStartedAt",0);w(this,"shakeStrength",0);this.catalog=t,this.entityPresenter=n,this.combatEffects=new Vy(e)}sync(e,t,n){for(const i of e.events)i.id<=this.lastEventId||(this.lastEventId=i.id,this.applyEventEffect(i,e,n));this.combatEffects.update(t)}getCameraShake(e){const t=(e-this.shakeStartedAt)/.32;return Math.max(0,1-t)*this.shakeStrength}clear(){this.combatEffects.clear(),this.lastEventId=0,this.shakeStrength=0,this.shakeStartedAt=0}dispose(){this.combatEffects.dispose()}applyEventEffect(e,t,n){switch(e.type){case"enemy-hit":this.entityPresenter.playEnemyHit(e.enemyId,t.elapsedSeconds),this.combatEffects.addHit(e.position,16773309);return;case"obstacle-hit":this.entityPresenter.playObstacleHit(e.obstacleId,t.elapsedSeconds),this.combatEffects.addHit(e.position,16762992);return;case"obstacle-destroyed":this.handleObstacleDestroyed(e,n);return;case"enemy-destroyed":this.entityPresenter.startEnemyDeath(e.enemyId,t.elapsedSeconds,e.deathVariant),this.combatEffects.addExplosion(e.position,1.5);return;case"player-damaged":this.entityPresenter.playPlayerHit(),this.combatEffects.addHit(t.player.position,16738898),this.startCameraShake(t.elapsedSeconds,.55);return;case"boss-arrived":this.startCameraShake(t.elapsedSeconds,.45);return;case"boss-destroyed":this.startCameraShake(t.elapsedSeconds,.8),this.combatEffects.addExplosion(e.position,5.5,16765274,1.45);return;case"explosion":this.startCameraShake(t.elapsedSeconds,.2),this.combatEffects.addExplosion(e.position,e.radius);return;case"pickup-collected":this.combatEffects.addPickup(e.position,Lv[e.kind]);return;case"radio-collected":n?.collectInteractable(e.presentationId),this.combatEffects.addPickup(e.position,Dv);return;case"encounter-spawned":case"level-transitioned":case"mission-failed":case"patrol-cleared":case"weapon-fired":return}}handleObstacleDestroyed(e,t){if(e.presentationId&&t?.collectInteractable(e.presentationId),e.kind==="barrel"){this.combatEffects.addBarrelExplosion(e.position,this.catalog.combat.barrelExplosionRadius);return}this.combatEffects.addExplosion(e.position,this.catalog.combat.obstacleExplosionRadius,16762992)}startCameraShake(e,t){const n=e-this.shakeStartedAt,i=Math.max(0,1-n/.32)*this.shakeStrength;this.shakeStrength=Math.max(i,t),this.shakeStartedAt=e}}const Xy="./assets/scenery/";class qy{constructor(e){w(this,"loader",new Vc);w(this,"assets",new Map);w(this,"loading");w(this,"loadCompleted",!1);w(this,"disposed",!1);this.catalog=e}async load(){if(!this.disposed){if(this.loading)return this.loading;this.loading=this.loadAssets().catch(()=>{}).finally(()=>{this.loadCompleted=!0}),await this.loading}}get didFinishLoading(){return this.loadCompleted}has(e){return this.assets.has(e)}isSideDressing(e){const t=this.catalog.assets[e];if(!t||t.category!=="scenery")return t?.tags.includes("side-dressing")??!1;const n=t.tags;return n.includes("side-dressing")||n.includes("desert")||n.includes("terrain")}create(e,t){if(this.disposed)return;const n=this.assets.get(e);if(!n)return;const i=n.anchor,s=ua(n.gltf.scene),a=new wt;return s.scale.setScalar(n.normalizedScale*t),s.position.set(-i.x*t,n.baseOffsetY*t-i.y*t,-i.z*t),this.groundInstance(s),s.userData.renderMode=n.renderMode,Tn(s,n.shadowPolicy),a.add(s),a}getHorizontalBounds(e,t,n,i,s){const a=this.assets.get(e);if(!a)return;const o=Math.abs(Math.sin(n)),c=Math.abs(Math.cos(n)),l=(a.baseHalfWidth*c+a.baseHalfDepth*o)*t,h=(a.baseHalfWidth*o+a.baseHalfDepth*c)*t;return new en(new I(i-l,0,s-h),new I(i+l,0,s+h))}dispose(){this.disposed||(this.disposed=!0,this.disposeLoadedAssets(),this.assets.clear())}async loadAssets(){const e=Object.entries(this.catalog.assets),t=await Promise.allSettled(e.map(([,n])=>this.loader.loadAsync(`${Xy}${n.path}`)));if(this.disposed){this.disposeResults(t);return}for(let n=0;n<e.length;n+=1){const i=t[n],s=e[n];if(!i||!s||i.status!=="fulfilled")continue;const[a,o]=s;this.assets.set(a,this.normalizeAsset(i.value,o))}}normalizeAsset(e,t){this.applyTint(e.scene,t.tint);const n=new en().setFromObject(e.scene),i=n.getSize(new I),s=i.y>0?t.targetHeight/i.y:1;return{gltf:e,normalizedScale:s,baseOffsetY:-n.min.y*s,baseHalfWidth:i.x*s/2,baseHalfDepth:i.z*s/2,anchor:t.anchor,renderMode:t.renderMode,shadowPolicy:t.shadowPolicy}}applyTint(e,t){if(!t)return;const n=new Ce(t);e.traverse(i=>{if(!(i instanceof Pe))return;const s=Array.isArray(i.material)?i.material:[i.material];for(const a of s)!("color"in a)||!(a.color instanceof Ce)||a.color.copy(n)})}groundInstance(e){e.updateMatrixWorld(!0);const t=new en().setFromObject(e);Number.isFinite(t.min.y)&&(e.position.y-=t.min.y)}disposeResults(e){for(const t of e)t.status==="fulfilled"&&this.disposeAsset(t.value)}disposeLoadedAssets(){for(const e of this.assets.values())this.disposeAsset(e.gltf)}disposeAsset(e){const t=new Set,n=new Set,i=new Set;e.scene.traverse(s=>{if(s instanceof Pe){if(t.add(s.geometry),Array.isArray(s.material)){for(const a of s.material)n.add(a),this.collectTextures(a,i);return}n.add(s.material),this.collectTextures(s.material,i)}});for(const s of t)s.dispose();for(const s of n)s.dispose();for(const s of i)s.dispose()}collectTextures(e,t){for(const n of Object.keys(e)){const i=e[n];i instanceof St&&t.add(i)}}}const fo=["wide","medium","close"],pc="wide",po={wide:{followOffsetZ:22,height:25,lookOffsetZ:-5},medium:{followOffsetZ:18,height:21,lookOffsetZ:-4},close:{followOffsetZ:15,height:18,lookOffsetZ:-3}};function Ky(r){const e=fo.indexOf(r);return fo[(e+1)%fo.length]??pc}class $y{constructor(e,t,n){w(this,"camera",new qt(48,1,.1,180));w(this,"objectFactory",new Ov);w(this,"humanoidFactory",new LS);w(this,"bossFactory",new jS);w(this,"levelPresenter");w(this,"effectsPresenter");w(this,"groundPlane",new Yn(new I(0,1,0),0));w(this,"pointer",new Ne);w(this,"pointerWorldPosition",new I);w(this,"raycaster",new Tm);w(this,"renderer");w(this,"scene",new xp);w(this,"entityPresenter");w(this,"obstaclePresenter");w(this,"hemisphereLight",new im(qr["jungle-front"].hemisphereSkyColor,qr["jungle-front"].hemisphereGroundColor,2.1));w(this,"sunLight",new Kd(qr["jungle-front"].sunColor,2.5));w(this,"cameraLighting",new Fv(this.camera,this.sunLight));w(this,"cameraMode",pc);w(this,"cameraBaseX",0);w(this,"cameraBaseZ",79);w(this,"renderFrame",0);w(this,"lastAnimationSeconds",0);w(this,"disposed",!1);this.canvas=e,this.catalog=t,this.sceneryCatalog=n,this.renderer=new Ev({antialias:!0,canvas:e}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=Ut,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=ad;const i=new qy(n);this.obstaclePresenter=new xy(this.scene,this.objectFactory,{getAuthoredPropMesh:this.findAuthoredPropMesh.bind(this),getSceneryAssetMesh:i.create.bind(i),obstacleAssetKinds:this.sceneryCatalog.obstacleAssetKinds,obstacleAssetKindsByLevel:this.sceneryCatalog.obstacleAssetKindsByLevel,obstacleAssetScales:this.sceneryCatalog.obstacleAssetScales,obstacleAssetScalesByLevel:this.sceneryCatalog.obstacleAssetScalesByLevel}),this.entityPresenter=new $S(this.scene,this.objectFactory,this.humanoidFactory,this.bossFactory,this.obstaclePresenter),this.levelPresenter=new Uy(this.scene,t,n,i,this.entityPresenter,this.hemisphereLight,this.sunLight,this.resetView.bind(this)),this.effectsPresenter=new Wy(this.scene,t,this.entityPresenter);const s=po[this.cameraMode];this.camera.position.set(0,s.height,79),this.camera.lookAt(0,0,52),this.addStaticWorld(),this.entityPresenter.loadHumanoids(),this.levelPresenter.loadAssets()}getWorldPosition(e,t){const n=this.canvas.getBoundingClientRect();if(this.pointer.set((e-n.left)/n.width*2-1,-((t-n.top)/n.height)*2+1),this.raycaster.setFromCamera(this.pointer,this.camera),!!this.raycaster.ray.intersectPlane(this.groundPlane,this.pointerWorldPosition))return{x:this.pointerWorldPosition.x,z:this.pointerWorldPosition.z}}render(e,t){this.levelPresenter.shouldActivate(e)&&this.levelPresenter.activate(e),this.renderFrame+=1;const n=Math.max(0,Math.min(e.elapsedSeconds-this.lastAnimationSeconds,.05));this.lastAnimationSeconds=e.elapsedSeconds;const i=e.player,s=this.objectFactory.playerMesh;s.position.x=i.position.x,s.position.z=i.position.z;const a=i.invulnerableSeconds<=0||Math.floor(i.invulnerableSeconds*24)%2!==0;s.visible=!this.entityPresenter.hasPlayerVisual&&a,this.entityPresenter.updatePlayer(e,t,n),this.effectsPresenter.sync(e,n,this.levelPresenter.currentScenery),this.levelPresenter.sync(e.worldSegments,e.elapsedSeconds),this.entityPresenter.sync(e,n,this.renderFrame),this.updatePlayerHealth(e),this.followPlayer(e.player.position,e.elapsedSeconds),this.renderer.render(this.scene,this.camera)}resetView(e,t=!0){t&&this.levelPresenter.requestRefresh(),this.effectsPresenter.clear(),this.entityPresenter.resetView(),t&&(this.cameraMode=pc),this.positionCamera(e)}cycleCameraMode(e){return this.cameraMode=Ky(this.cameraMode),this.positionCamera(e),this.cameraMode}get currentCameraMode(){return this.cameraMode}positionCamera(e){const t=po[this.cameraMode];this.cameraBaseX=e.x,this.cameraBaseZ=e.z+t.followOffsetZ,this.camera.position.set(e.x,t.height,this.cameraBaseZ),this.camera.lookAt(e.x,0,e.z+t.lookOffsetZ)}setAnimationLoop(e){this.renderer.setAnimationLoop(e)}resize(){this.renderer.setSize(window.innerWidth,window.innerHeight),this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix()}dispose(){this.disposed||(this.disposed=!0,this.renderer.setAnimationLoop(null),this.effectsPresenter.clear(),this.entityPresenter.dispose(),this.effectsPresenter.dispose(),this.levelPresenter.dispose(),this.objectFactory.dispose(),this.humanoidFactory.dispose(),this.bossFactory.dispose(),this.renderer.dispose())}addStaticWorld(){const e=this.sunLight.shadow,t=e.camera,n=this.objectFactory.playerMesh,i=this.objectFactory.healthBack,s=this.objectFactory.healthFill;this.scene.add(this.hemisphereLight),this.sunLight.castShadow=!0,e.mapSize.set(1024,1024),t.left=Qi.left,t.right=Qi.right,t.top=Qi.top,t.bottom=Qi.bottom,t.near=Qi.near,t.far=Qi.far,t.updateProjectionMatrix(),this.cameraLighting.sync(),this.scene.add(this.sunLight),this.scene.add(this.sunLight.target),n.position.y=.9,n.castShadow=!0,n.scale.setScalar(bv*ac),this.scene.add(n),i.scale.set(2.1,.24,1),s.scale.set(2,.17,1),i.renderOrder=30,s.renderOrder=31,this.scene.add(i,s)}updatePlayerHealth(e){const t=Math.max(0,e.player.health/this.catalog.rules.playerMaxHealth),n=e.player.position,i=this.objectFactory.healthBack,s=this.objectFactory.healthFill;i.position.set(n.x,Nh,n.z),s.position.set(n.x-(1-t),Nh,n.z),s.scale.x=Math.max(.01,2*t),s.material.color.setHex(nu(t)),i.visible=e.mission.status!=="failed",s.visible=i.visible}findAuthoredPropMesh(e){return this.levelPresenter.getInteractableMesh(e)}followPlayer(e,t){const n=po[this.cameraMode],i=this.camera.position;this.cameraBaseX+=(e.x-this.cameraBaseX)*.05,this.cameraBaseZ+=(e.z+n.followOffsetZ-this.cameraBaseZ)*.08;const s=this.effectsPresenter.getCameraShake(t);i.x=this.cameraBaseX+Math.sin(t*95)*s,i.y=n.height+Math.cos(t*71)*s*.45,i.z=this.cameraBaseZ,this.camera.lookAt(e.x,0,e.z+n.lookOffsetZ),this.cameraLighting.sync()}}class Yy{constructor(e,t,n,i){this.gameState=e,this.catalog=t,this.damageEnemy=n,this.damagePlayer=i}resolve(e){const t=this.catalog.combat.barrelExplosionRadius,n=this.catalog.combat.barrelExplosionDamage;this.damageEnemiesInRadius(e,t,n);const i=t+this.catalog.player.radius;Bt(e,this.gameState.player.position)<i*i&&this.damagePlayer(n)}damageEnemiesInRadius(e,t,n){for(let i=this.gameState.enemies.length-1;i>=0;i-=1){const s=this.gameState.enemies[i];if(!s)continue;const a=t+this.catalog.enemies[s.kind].radius,o=Math.sqrt(Bt(e,s.position));if(o>=a)continue;const c=1-o/a*this.catalog.rules.rocketDamageFalloff;this.damageEnemy(s,n*c)}}}class Zy{constructor(e,t,n){this.gameState=e,this.catalog=t,this.random=n}spawnPlayer(e,t){if(e==="shotgun"){for(let n=0;n<this.catalog.rules.shotgunPelletCount;n+=1){const i=this.createShotgunSpread();this.scheduleShotgunPellet(e,t,i)}return}this.spawnPlayerProjectile(e,t,{angle:0,muzzleForwardDelta:0,muzzleLateralDelta:0})}advanceScheduledProjectiles(e){const t=this.gameState.pendingPlayerProjectiles;for(let n=t.length-1;n>=0;n-=1){const i=t[n];if(!i||(i.delaySeconds-=e,i.delaySeconds>0))continue;const s=this.pendingSpread(i);this.spawnPlayerProjectile(i.kind,i.target,s),t.splice(n,1)}this.advanceScheduledEnemyProjectiles(e)}spawnEnemy(e,t,n,i,s){if(n.attackType==="grenade"){this.spawnGrenadeAttack(e,t,n,i,s);return}if(n.attackType==="shotgun"){this.scheduleShotgunEnemyAttack(e,t,n,i,s);return}if(n.pattern==="jungle"){this.spawnJungleAttack(e,t,n,i,s);return}this.spawnFanAttack(e,t,n,i,s)}scheduleShotgunEnemyAttack(e,t,n,i,s){const a=this.getEnemyProjectileSpeed(n.projectileSpeed);for(let o=0;o<n.count;o+=1){const c=this.createShotgunSpread(),l=this.random.next()*this.catalog.rules.shotgunPelletDelaySeconds,h={angle:c.angle,damage:t.damage,delaySeconds:l,direction:{x:i,z:s},enemyId:e.id,muzzleForwardDelta:c.muzzleForwardDelta,muzzleLateralDelta:c.muzzleLateralDelta,radius:this.catalog.combat.enemyProjectileRadius,lifeSeconds:this.catalog.combat.enemyProjectileLifeSeconds,speed:a};this.gameState.pendingEnemyProjectiles.push(h)}}advanceScheduledEnemyProjectiles(e){const t=this.gameState.pendingEnemyProjectiles;for(let n=t.length-1;n>=0;n-=1){const i=t[n];if(!i||(i.delaySeconds-=e,i.delaySeconds>0))continue;const s=this.gameState.enemies.find(a=>a.id===i.enemyId);if(!s){t.splice(n,1);continue}this.spawnEnemyShotgunProjectile(s,i),t.splice(n,1)}}spawnEnemyShotgunProjectile(e,t){const n=Math.cos(t.angle),i=Math.sin(t.angle),s=t.direction,a={x:(s.x*n-s.z*i)*t.speed,z:(s.x*i+s.z*n)*t.speed},o=this.getMuzzlePosition(e.position,s.x,s.z,hc+t.muzzleLateralDelta,lc+t.muzzleForwardDelta),c=this.allocateProjectileId();this.gameState.projectiles.push({damage:t.damage,id:c,kind:"enemy",lifeSeconds:t.lifeSeconds,ownerEnemyId:t.enemyId,position:o,radius:t.radius,velocity:a})}spawnPlayerProjectile(e,t,n){const i=this.catalog.weapons[e],s=this.getDirection(this.gameState.player.position,t,{x:0,z:1}),a=this.getMuzzlePosition(this.gameState.player.position,s.x,s.z,ES+n.muzzleLateralDelta,MS+n.muzzleForwardDelta),o=this.getForwardMuzzleDirection(a,t,s,n.angle),c={x:o.x*i.speed,z:o.z*i.speed},l=this.allocateProjectileId();this.gameState.projectiles.push({damage:i.damage,id:l,kind:e,lifeSeconds:i.life,position:a,radius:i.radius,velocity:c})}getForwardMuzzleDirection(e,t,n,i){const s=this.getDirection(e,t),a=this.rotateDirection(s,i),o=s.x*n.x+s.z*n.z,c=a.x*n.x+a.z*n.z;return o<=0||c<=0?this.rotateDirection(n,i):a}createShotgunSpread(){const e=this.catalog.rules,t=this.createSignedRandomValue(e.shotgunSpread),n=this.createSignedRandomValue(e.shotgunMuzzleForwardJitter),i=this.createSignedRandomValue(e.shotgunMuzzleLateralJitter);return{angle:t,muzzleForwardDelta:n,muzzleLateralDelta:i}}scheduleShotgunPellet(e,t,n){const i=this.random.next()*this.catalog.rules.shotgunPelletDelaySeconds,s={angle:n.angle,delaySeconds:i,kind:e,muzzleForwardDelta:n.muzzleForwardDelta,muzzleLateralDelta:n.muzzleLateralDelta,target:{...t}};this.gameState.pendingPlayerProjectiles.push(s)}pendingSpread(e){return{angle:e.angle,muzzleForwardDelta:e.muzzleForwardDelta,muzzleLateralDelta:e.muzzleLateralDelta}}createSignedRandomValue(e){return(this.random.next()*2-1)*e}spawnJungleAttack(e,t,n,i,s){const a=this.getEnemyProjectileSpeed(n.projectileSpeed);for(let o=0;o<n.count;o+=1){const c=(this.random.next()-.5)*n.aimSpread+(o-(n.count-1)/2)*n.spreadStep,l=ks(e.position,{x:i,z:s}),h={x:(i-s*c)*a,z:(s+i*c)*a};this.addEnemyProjectile(e,t,l,h)}}spawnFanAttack(e,t,n,i,s){const a=this.getEnemyProjectileSpeed(n.projectileSpeed),o=(this.random.next()*2-1)*n.aimSpread;for(let c=0;c<n.count;c+=1){const l=o+(c-(n.count-1)/2)*n.spreadStep,h=Math.cos(l),d=Math.sin(l),u=ks(e.position,{x:i,z:s}),f={x:(i*h-s*d)*a,z:(i*d+s*h)*a};this.addEnemyProjectile(e,t,u,f)}}spawnGrenadeAttack(e,t,n,i,s){const a=this.getEnemyProjectileSpeed(n.projectileSpeed),o=this.allocateProjectileId(),c=ks(e.position,{x:i,z:s}),l={x:i*a,z:s*a};this.gameState.projectiles.push({damage:t.damage,explosionRadius:n.explosionRadius,id:o,kind:"enemy-grenade",lifeSeconds:this.catalog.combat.enemyProjectileLifeSeconds,ownerEnemyId:e.id,position:c,radius:this.catalog.combat.enemyProjectileRadius,velocity:l})}addEnemyProjectile(e,t,n,i){const s=this.allocateProjectileId();this.gameState.projectiles.push({damage:t.damage,id:s,kind:"enemy",lifeSeconds:this.catalog.combat.enemyProjectileLifeSeconds,ownerEnemyId:e.id,position:n,radius:this.catalog.combat.enemyProjectileRadius,velocity:i})}getDirection(e,t,n){const i=t.x-e.x,s=t.z-e.z,a=Math.hypot(i,s);if(a<this.catalog.rules.minDirectionLength&&n)return n;const o=Math.max(this.catalog.rules.minDirectionLength,a);return{x:i/o,z:s/o}}rotateDirection(e,t){const n=Math.cos(t),i=Math.sin(t);return{x:e.x*n-e.z*i,z:e.x*i+e.z*n}}getMuzzlePosition(e,t,n,i,s){return{x:e.x+n*i+t*s,z:e.z-t*i+n*s}}getEnemyProjectileSpeed(e){return this.gameState.campaign.difficulty!=="hard"?e:e*this.catalog.rules.hardEnemyProjectileSpeedMultiplier}allocateProjectileId(){const e=this.gameState.session.nextProjectileId;return this.gameState.session.nextProjectileId+=1,e}}class jy{constructor(e,t,n,i,s){this.gameState=e,this.catalog=t,this.projectileFactory=n,this.recordEvent=i,this.damagePlayer=s}tryClubAttack(e,t,n){n>t.range||e.fireCooldownSeconds>0||(e.fireCooldownSeconds=this.getCooldown(t.cooldown),this.damagePlayer(t.damage))}fire(e,t,n,i){e.fireCooldownSeconds=this.getCooldown(t.cooldown);const s=this.catalog.levels[this.gameState.campaign.currentLevel].enemyPool,a=this.getAttackProfile(e,t,s);this.projectileFactory.spawnEnemy(e,t,a,n,i)}explodeGrenade(e,t,n){this.recordEvent({position:{...e},radius:t,type:"explosion"});const i=t+this.catalog.player.radius,s=Math.sqrt(Bt(e,this.gameState.player.position));if(s>=i)return;const a=1-s/i*this.catalog.rules.rocketDamageFalloff;this.damagePlayer(n*a)}getCooldown(e){return this.gameState.campaign.difficulty!=="hard"?e:e/this.catalog.rules.hardEnemyFireRateMultiplier}getAttackProfile(e,t,n){return n==="desert"?this.catalog.desertAttackOverrides[e.kind]??t.attack:n==="frozen"?this.catalog.frozenAttackOverrides[e.kind]??t.attack:t.attack}}class Jy{constructor(e,t,n){this.gameState=e,this.catalog=t,this.world=n}advance(e,t,n,i,s){const a=this.catalog.enemies[e.kind];if(!this.usesCover(e,a)||s>a.fireRange)return this.clearCover(e),!0;e.coverDecisionSeconds=Math.max(0,(e.coverDecisionSeconds??0)-t),e.coverElapsedSeconds=(e.coverElapsedSeconds??0)+t,e.coverExposureSeconds=Math.max(0,(e.coverExposureSeconds??0)-t);const o=e.coverObstacleId!==void 0,c=o&&this.hasPlayerChangedAngle(e.coverPlayerDirection,i),l=e.coverDecisionSeconds<=0||c,h=this.findObstacle(e.coverObstacleId),d=h!==void 0&&this.isCoverBetweenPlayerAndEnemy(e,h,i,s),u=o&&!h,f=!o&&l,g=o&&e.coverMode!=="peek"&&(!d||l);c||u||f||g?this.chooseCover(e,i,s):l&&(e.coverDecisionSeconds=this.catalog.rules.hardCoverDecisionInterval);const m=this.findObstacle(e.coverObstacleId);return!m||!e.coverPosition?(this.clearCover(e),!0):e.coverElapsedSeconds>this.catalog.rules.hardCoverTimeoutSeconds?(e.coverRejectedObstacleId=m.id,this.clearCover(e),!0):this.advanceCoverPosition(e,a,i,n,m,e.coverPosition)}advanceCoverPosition(e,t,n,i,s,a){const o=this.catalog.rules,c=e.position,l=e.coverMode==="peek"?this.getPeekPosition(a,s,n,t.radius):a,h=l.x-c.x,d=l.z-c.z,u=Math.hypot(h,d);if(u>t.radius*.35)return i.x=h/Math.max(u,o.distanceEpsilon),i.z=d/Math.max(u,o.distanceEpsilon),e.coverMode=e.coverMode==="peek"?"peek":"approach",!1;if(i.x=0,i.z=0,e.coverElapsedSeconds=0,e.coverMode!=="peek")return e.fireCooldownSeconds>0||(e.coverExposureSeconds??0)>0?(e.coverMode="covered",!1):(e.coverMode="peek",!1);const f=ks(e.position,n);return e.fireCooldownSeconds>0?!1:this.isLineBlocked(f,this.gameState.player.position)?(e.coverMode="covered",!1):(e.coverMode="covered",e.coverExposureSeconds=this.catalog.rules.hardCoverExposureSeconds,!0)}usesCover(e,t){return this.isHardDifficulty()&&!ln(e.kind)&&e.kind!=="turret"&&t.attack.attackType!=="club"&&t.speed>0}canFire(e,t,n){if(!this.usesCover(e,this.catalog.enemies[e.kind]))return!0;const i=ks(e.position,t),s=e.position.x+t.x*n,a=e.position.z+t.z*n;return!this.isLineBlocked(i,{x:s,z:a})}getCoverPosition(e,t,n){const i=e.radius+this.catalog.enemies[t.kind].radius+this.catalog.rules.hardCoverPeekDistance,s=e.position.x-n.x*i,a=e.position.z-n.z*i;return{x:s,z:a}}canReachCover(e,t){const n=this.catalog.rules.enemyXMargin;if(t.x<this.catalog.player.minX+n||t.x>this.catalog.player.maxX-n)return!1;const i=this.catalog.enemies[e.kind].radius;for(const s of this.findNearbyObstacles(e)){const a=s.radius+i;if(Ri(s.position,e.position,t)<a*a)return!1}return!0}chooseCover(e,t,n){const i=this.catalog.rules,a=this.gameState.player.position;e.coverDecisionSeconds=i.hardCoverDecisionInterval;let o,c=Number.POSITIVE_INFINITY;for(const d of this.findNearbyObstacles(e)){if(d.id===e.coverRejectedObstacleId)continue;const u=d.position,f=Ri(u,a,e.position),g=d.radius+this.catalog.enemies[e.kind].radius;if(f>g*g)continue;const y=(u.x-a.x)*-t.x+(u.z-a.z)*-t.z;if(y<0||y>n)continue;const m=Bt(e.position,u);if(m>i.hardCoverMaxDistance**2||m>=c)continue;const p=this.getCoverPosition(d,e,t);this.canReachCover(e,p)&&(o=d,c=m)}if(!o){this.clearCover(e),e.coverDecisionSeconds=i.hardCoverDecisionInterval;return}const l=this.getCoverPosition(o,e,t),h=this.hasPlayerChangedAngle(e.coverPlayerDirection,t);(e.coverObstacleId!==o.id||h)&&(e.coverObstacleId=o.id,e.coverPosition=l,e.coverMode="approach",e.coverElapsedSeconds=0,e.coverPlayerDirection={...t})}getPeekPosition(e,t,n,i){const s=this.gameState.player.position.x>=t.position.x?-1:1,a=t.radius+i+this.catalog.rules.hardCoverPeekDistance*2,o=e.x-n.z*a*s,c=e.z+n.x*a*s;return{x:o,z:c}}findNearbyObstacles(e){return this.world.getNearbyObstacleCandidates(e.position,this.catalog.rules.hardCoverMaxDistance,Math.floor(this.catalog.rules.hardCoverSearchLimit))}isCoverBetweenPlayerAndEnemy(e,t,n,i){const s=this.gameState.player.position,a=t.position,o=(a.x-s.x)*-n.x+(a.z-s.z)*-n.z;if(o<0||o>i)return!1;const c=s.x-n.x*o,l=s.z-n.z*o,h={x:c,z:l},d=t.radius+this.catalog.enemies[e.kind].radius;return Bt(h,a)<=d*d}isLineBlocked(e,t){for(const n of this.gameState.obstacles){const i=n.radius+this.catalog.combat.enemyProjectileRadius;if(Ri(n.position,e,t)<i*i)return!0}return!1}findObstacle(e){if(e!==void 0)return this.world.getObstacle(e)}hasPlayerChangedAngle(e,t){return e?e.x*t.x+e.z*t.z<this.catalog.rules.hardCoverRepositionAngleDot:!0}clearCover(e){e.coverObstacleId=void 0,e.coverPosition=void 0,e.coverPlayerDirection=void 0,e.coverExposureSeconds=0,e.coverMode=void 0,e.coverElapsedSeconds=0}isHardDifficulty(){return this.gameState.campaign.difficulty==="hard"}}class Qy{constructor(e,t,n){w(this,"coverTactics");this.gameState=e,this.catalog=t,this.world=n,this.coverTactics=new Jy(e,t,n)}advance(e,t){const n=this.gameState.player,i=n.position.x-e.position.x,s=n.position.z-e.position.z,a=Math.max(this.catalog.rules.distanceEpsilon,Math.hypot(i,s)),o={x:i/a,z:s/a},c=this.catalog.enemies[e.kind],l=this.getMovement(e,c,i,s,a);e.retreatCooldownSeconds=Math.max(0,(e.retreatCooldownSeconds??0)-t);const h=this.advanceRetreat(e,c,t,l),d=h?!1:this.advanceFlank(e,c,t,l);let u=!1;!h&&d?u=!0:h||(u=this.coverTactics.advance(e,t,l,o,a)),this.move(e,c,l,t),e.dodgeCooldownSeconds=Math.max(0,e.dodgeCooldownSeconds-t),e.fireCooldownSeconds-=t;const f=this.getAim(i,s,a),g=u&&this.coverTactics.canFire(e,f,a);return{aim:f,canFire:g,distance:a}}advanceRetreat(e,t,n,i){const s=this.catalog.rules,a=this.catalog.player,o=e.position;if(!this.isHardDifficulty()||ln(e.kind)||e.kind==="turret"||t.attack.attackType==="club"||t.speed<=0)return!1;if(!e.retreatTarget&&(e.retreatCooldownSeconds??0)<=0&&e.health/e.maxHealth<=s.hardRetreatHealthRatio){const d=o.x-this.gameState.player.position.x,u=o.z-this.gameState.player.position.z,f=Math.max(s.distanceEpsilon,Math.hypot(d,u)),g={x:o.x+d/f*s.hardRetreatDistance,z:o.z+u/f*s.hardRetreatDistance};g.x>=a.minX+s.enemyXMargin&&g.x<=a.maxX-s.enemyXMargin&&g.z>=a.minZ&&g.z<=a.maxZ&&(e.retreatTarget=g,e.retreatElapsedSeconds=0)}if(!e.retreatTarget)return!1;if(e.retreatElapsedSeconds=(e.retreatElapsedSeconds??0)+n,e.retreatElapsedSeconds>=s.hardRetreatDurationSeconds)return e.retreatTarget=void 0,e.retreatElapsedSeconds=0,e.retreatCooldownSeconds=s.hardRetreatCooldownSeconds,!1;const c=e.retreatTarget.x-e.position.x,l=e.retreatTarget.z-e.position.z,h=Math.max(s.distanceEpsilon,Math.hypot(c,l));return h<t.radius*.35?(e.retreatTarget=void 0,e.retreatElapsedSeconds=0,e.retreatCooldownSeconds=s.hardRetreatCooldownSeconds,!1):(i.x=c/h,i.z=l/h,!0)}advanceFlank(e,t,n,i){const s=this.catalog.rules,a=this.catalog.player,o=e.position;if(!this.isHardDifficulty()||e.tacticalRole!=="flank"||ln(e.kind)||e.kind==="turret"||t.attack.attackType==="club"||t.speed<=0)return!1;if(!this.gameState.enemies.find(g=>g.tacticalRole==="pressure"&&g.health>0))return e.tacticalRole=void 0,e.flankElapsedSeconds=0,!1;e.flankElapsedSeconds=(e.flankElapsedSeconds??0)+n;const l=e.id%2===0?-1:1,h={x:Math.max(a.minX+s.enemyXMargin,Math.min(a.maxX-s.enemyXMargin,this.gameState.player.position.x+l*s.hardFlankDistance)),z:Math.max(a.minZ+s.enemyXMargin,Math.min(a.maxZ,this.gameState.player.position.z-Math.max(t.range,s.hardFlankDistance)))};if(e.flankElapsedSeconds>=s.hardFlankTimeoutSeconds||Bt(o,h)<t.radius**2)return e.tacticalRole=void 0,e.flankElapsedSeconds=0,!1;const d=h.x-o.x,u=h.z-o.z,f=Math.max(s.distanceEpsilon,Math.hypot(d,u));return i.x=d/f,i.z=u/f,!0}getMovement(e,t,n,i,s){const a=this.catalog.rules,o=this.getApproach(s,t.range),c=this.isHardDifficulty()?a.hardStrafeAmplitudeMultiplier:1,l=Math.sin(this.gameState.elapsedSeconds*a.enemyStrafeFrequency+e.phase)*a.enemyStrafeAmplitude*c;let h=n/s*o-i/s*l,d=i/s*o+n/s*l;const u=this.findProjectileDodge(e);return u&&(h+=u.x,d+=u.z,e.dodgeCooldownSeconds=a.hardDodgeCooldown),{x:h,z:d}}getApproach(e,t){return e>t?1:e<t*this.catalog.rules.enemyApproachRetreatRatio?this.catalog.rules.enemyRetreatSpeed:0}move(e,t,n,i){const s=this.getMoveLength(t,n.x,n.z),a=this.getMovementSpeed(t),o=e.position,c=o.x+n.x/s*a*i;o.x=Math.max(this.catalog.player.minX+this.catalog.rules.enemyXMargin,Math.min(this.catalog.player.maxX-this.catalog.rules.enemyXMargin,c)),o.z+=n.z/s*a*i,this.world.resolveObstacleCollision(o,t.radius)}getMovementSpeed(e){const t=this.getSpeedMultiplier(),n=e.speed*e.speedMultiplier*t,i=this.catalog.rules.enemyMaxSpeed*t;return Math.min(n,i)}getMoveLength(e,t,n){const i=Math.hypot(t,n);return e.fullSpeedMovement?Math.max(this.catalog.rules.distanceEpsilon,i):Math.max(1,i)}getAim(e,t,n){if(!this.isHardDifficulty())return{x:e/n,z:t/n};const i=this.catalog.rules.hardAimLeadSeconds,s=e+this.gameState.player.velocity.x*i,a=t+this.gameState.player.velocity.z*i,o=Math.max(this.catalog.rules.distanceEpsilon,Math.hypot(s,a));return{x:s/o,z:a/o}}findProjectileDodge(e){const t=this.catalog.rules;if(!this.isHardDifficulty()||e.dodgeCooldownSeconds>0)return;const n=e.position;for(const i of this.gameState.projectiles){if(i.kind==="enemy"||i.kind==="enemy-grenade")continue;const s=i.position,a=i.velocity,o=n.x-s.x,c=n.z-s.z,l=a.x**2+a.z**2;if(l<=t.distanceEpsilon)continue;const h=Math.max(0,Math.min(t.hardDodgeLookaheadSeconds,(o*a.x+c*a.z)/l)),d={x:s.x+a.x*h,z:s.z+a.z*h};if(Ri(n,s,d)>t.hardDodgeDistance**2)continue;const f=-a.z,g=a.x,y=Math.max(t.distanceEpsilon,Math.hypot(f,g));return{x:f/y,z:g/y}}}getSpeedMultiplier(){return this.isHardDifficulty()?this.catalog.rules.hardEnemySpeedMultiplier:1}isHardDifficulty(){return this.gameState.campaign.difficulty==="hard"}}class eM{constructor(e,t,n,i,s){w(this,"barrelExplosionResolver");w(this,"projectileFactory");w(this,"enemyAttackResolver");w(this,"enemyTactics");this.gameState=e,this.catalog=t,this.random=n,this.world=i,this.recordEvent=s,this.projectileFactory=new Zy(e,t,n),this.enemyAttackResolver=new jy(e,t,this.projectileFactory,s,this.damagePlayer.bind(this)),this.enemyTactics=new Qy(e,t,i),this.barrelExplosionResolver=new Yy(e,t,this.damageEnemy.bind(this),this.damagePlayer.bind(this))}tryFireWeapon(e){if(!e.fire||this.gameState.session.fireCooldownSeconds>0)return;const t=this.gameState.player;if(Math.hypot(e.aim.x-t.position.x,e.aim.z-t.position.z)<this.catalog.rules.minDirectionLength)return;const i=this.catalog.weapons[e.weapon];this.gameState.session.fireCooldownSeconds=i.cooldown,t.shots+=1,this.recordEvent({type:"weapon-fired",weapon:e.weapon}),this.projectileFactory.spawnPlayer(e.weapon,e.aim)}advanceEnemies(e){for(const t of this.gameState.enemies){const n=this.catalog.enemies[t.kind],i=this.enemyTactics.advance(t,e);if(i.distance<this.catalog.rules.enemySeenDistance&&(t.seen=!0),n.attack.attackType==="club"){this.enemyAttackResolver.tryClubAttack(t,n,i.distance);continue}i.canFire&&i.distance<n.fireRange&&t.fireCooldownSeconds<=0&&this.enemyAttackResolver.fire(t,n,i.aim.x,i.aim.z);const s=n.radius+this.catalog.player.radius+this.catalog.rules.enemyContactDistance;i.distance<s&&this.damagePlayer(n.contactDamage)}}advanceScheduledProjectiles(e){this.projectileFactory.advanceScheduledProjectiles(e)}advanceProjectiles(e){const t=this.gameState.projectiles;for(let n=t.length-1;n>=0;n-=1){const i=t[n];if(!i)continue;i.lifeSeconds-=e;const s=i.position,a={...s};if(s.x+=i.velocity.x*e,s.z+=i.velocity.z*e,this.projectileHit(i,a)||i.lifeSeconds<=0){if(i.kind==="rocket"){const o=i.lifeSeconds<=0,c=o?this.catalog.rules.rocketExpiredRadius:this.catalog.combat.rocketImpactRadius,l=o?i.damage*this.catalog.rules.rocketExpiredDamageScale:i.damage;this.explodeRocket(s,c,l)}i.kind==="enemy-grenade"&&this.enemyAttackResolver.explodeGrenade(i.position,i.explosionRadius??0,i.damage),t.splice(n,1)}}}advancePickups(e){const t=this.gameState.pickups,n=this.gameState.player,i=this.catalog.rules;for(let s=t.length-1;s>=0;s-=1){const a=t[s];if(!a)continue;if(a.ageSeconds+=e,a.ageSeconds>=i.pickupExpirySeconds){t.splice(s,1);continue}if(Bt(n.position,a.position)>this.catalog.combat.pickupDistance**2)continue;a.kind==="health"&&(n.health=Math.min(i.playerMaxHealth,n.health+i.healthPickupAmount)),a.kind==="weapon"&&(this.gameState.session.fireCooldownSeconds=0,n.score+=i.weaponPickupScore);const o={...a.position};t.splice(s,1),this.recordEvent({kind:a.kind,pickupId:a.id,position:o,type:"pickup-collected"})}}advanceRadios(){const e=this.catalog.combat.pickupDistance**2,t=this.gameState.radios;for(let n=t.length-1;n>=0;n-=1){const i=t[n];i&&(Bt(this.gameState.player.position,i.position)>e||(t.splice(n,1),this.gameState.collectedInteractableKeys.push(i.presentationId),this.recordEvent({position:{...i.position},presentationId:i.presentationId,radioId:i.id,type:"radio-collected"})))}}damageEnemy(e,t){const n=this.gameState.player;e.health-=t,n.hits+=1;const i={...e.position};if(this.recordEvent({enemyId:e.id,position:i,type:"enemy-hit"}),e.health>0)return;this.gameState.enemies.splice(this.gameState.enemies.indexOf(e),1),n.kills+=1,n.score+=this.catalog.enemies[e.kind].score;const s={...e.position};if(this.recordEvent({deathVariant:e.phase<Math.PI?"standard":"back-fall",enemyId:e.id,position:s,type:"enemy-destroyed"}),ln(e.kind)){this.gameState.mission.status="level-transition",this.gameState.mission.transitionSeconds=this.catalog.mission.bossTransitionSeconds,this.recordEvent({enemyId:e.id,position:{...s},type:"boss-destroyed"});return}this.random.next()>=this.catalog.rules.pickupSpawnChance||this.spawnPickup(e.position,this.catalog.rules.pickupHealthChance)}projectileHit(e,t){if(e.kind==="enemy"||e.kind==="enemy-grenade"){const n=this.catalog.player.radius+e.radius;return Ri(this.gameState.player.position,t,e.position)<n*n?(e.kind==="enemy"&&this.damagePlayer(e.damage),!0):this.projectileHitsObstacle(e,t)}for(const n of this.gameState.enemies){const i=this.catalog.enemies[n.kind].radius+(e.kind==="rocket"?this.catalog.combat.rocketImpactRadius:e.radius);if(!(Ri(n.position,t,e.position)>=i*i))return e.kind!=="rocket"&&this.damageEnemy(n,e.damage),!0}return this.projectileHitsObstacle(e,t)}projectileHitsObstacle(e,t){for(const n of this.gameState.obstacles){const i=n.radius+e.radius;if(!(Ri(n.position,t,e.position)>=i*i))return e.kind==="enemy"||e.kind==="enemy-grenade"?this.recordObstacleHit(n):e.kind!=="rocket"&&this.damageObstacle(n,e.damage),!0}return!1}explodeRocket(e,t,n){const i={...e};this.recordEvent({position:i,radius:t,type:"explosion"});for(let s=this.gameState.enemies.length-1;s>=0;s-=1){const a=this.gameState.enemies[s];if(!a)continue;const o=t+this.catalog.enemies[a.kind].radius,c=Math.sqrt(Bt(e,a.position));c<o&&this.damageEnemy(a,n*(1-c/o*this.catalog.rules.rocketDamageFalloff))}for(let s=this.gameState.obstacles.length-1;s>=0;s-=1){const a=this.gameState.obstacles[s];if(!a)continue;const o=t+a.radius;Bt(e,a.position)<o*o&&this.damageObstacle(a,n)}}damageObstacle(e,t){if(this.recordObstacleHit(e),e.kind!=="crate"&&e.kind!=="barrel"||(e.health-=t,e.health>0))return;this.recordObstacleDestroyed(e);const n={...e.position};e.kind==="barrel"&&this.barrelExplosionResolver.resolve(n),this.world.removeObstacle(e),e.kind==="crate"&&e.presentationId&&this.gameState.collectedInteractableKeys.push(e.presentationId),!(this.random.next()>=this.catalog.rules.cratePickupChance)&&this.spawnPickup(e.position,this.catalog.rules.crateHealthChance)}recordObstacleHit(e){this.recordEvent({obstacleId:e.id,position:{...e.position},presentationId:e.presentationId,type:"obstacle-hit"})}recordObstacleDestroyed(e){this.recordEvent({kind:e.kind,obstacleId:e.id,position:{...e.position},presentationId:e.presentationId,type:"obstacle-destroyed"})}damagePlayer(e){const t=this.gameState.player;t.invulnerableSeconds>0||this.gameState.mission.status==="failed"||(t.health=Math.max(0,t.health-e),t.invulnerableSeconds=this.catalog.rules.playerInvulnerableSeconds,this.recordEvent({type:"player-damaged"}),!(t.health>0)&&(this.gameState.mission.status="failed",this.recordEvent({type:"mission-failed"})))}spawnPickup(e,t){const n=this.allocatePickupId(),i=this.random.next()<t?"health":"weapon",s={...e};this.gameState.pickups.push({ageSeconds:0,id:n,kind:i,position:s})}allocatePickupId(){const e=this.gameState.session.nextPickupId;return this.gameState.session.nextPickupId+=1,e}}const tM=.8,nM=2,iM=Math.PI*2,sM=6,id=3,rM=5,aM=13,oM=8,cM=64;class mi{static createEnemy(e,t,n,i,s){return mi.createEnemyState(e,t,n,i,s)}static createBoss(e,t,n,i,s){return mi.createEnemyState(e,t,n,i,s)}static createObstacle(e,t,n,i,s){return{health:s.health,id:e,kind:t,position:n,radius:s.radius,segment:i}}static createSegmentObstacles(e,t,n,i,s,a,o){const c=[];for(let l=0;l<sM;l+=1){const h=mi.obstacleKindAt(l,e,a),d=l%2===0?-1:1,u=rM+s.next()*aM,f=t+l,g={x:d*u,z:n-e*i-oM-s.next()*cM};c.push(mi.createObstacle(f,h,g,e,o[h]))}return c}static obstacleKindAt(e,t,n){if(n.length===0)throw new Error("A level must define at least one obstacle kind.");let i=(e+t)%n.length;return n.length===id&&(i=e%id),n[i]??"rock"}static createEnemyState(e,t,n,i,s){return{dodgeCooldownSeconds:0,fireCooldownSeconds:(tM+s.next())*nM,health:i,maxHealth:i,id:e,kind:t,phase:s.next()*iM,position:n,seen:!1}}}class lM{constructor(e,t,n,i,s){this.gameState=e,this.catalog=t,this.random=n,this.world=i,this.recordEvent=s}start(){this.spawnWave(0)}advance(e){this.advanceMission(),this.advanceSpawnQueue(e)}advanceLevelTransition(e){const t=this.gameState.mission;if(t.transitionSeconds=Math.max(0,t.transitionSeconds-e),t.transitionSeconds>0)return;const n=this.gameState.campaign.currentLevel,i=this.catalog.levels[n];if(!i.next){t.status="level-complete";return}this.clearLevelState(),this.prepareLevel(i.next,i.bonus),this.recordEvent({level:i.next,type:"level-transitioned"})}advanceMission(){const e=this.gameState.mission,n=this.gameState.player.position,i=this.catalog.player,s=this.catalog.rules,a=this.gameState.enemies,o=this.gameState.spawnQueue,c=(i.maxZ-n.z)/(i.maxZ-i.minZ);e.progress=Math.max(0,Math.min(1,c));for(let l=a.length-1;l>=0;l-=1){const h=a[l],d=h&&h.position.z>n.z+s.enemyRetireDistance,u=h&&Bt(h.position,n)>s.enemySeenDistance**2;h&&!ln(h.kind)&&d&&u&&a.splice(l,1)}if(e.status==="in-progress"&&a.length===0&&o.length===0){const l=e.wave+1,h=Math.min(this.catalog.mission.maxWave,Math.floor(e.progress*this.catalog.mission.waveCount));l<=h&&this.spawnWave(l)}e.status==="in-progress"&&e.progress>=i.bossThreshold&&(e.status="boss-pending"),e.status==="boss-pending"&&a.length===0&&o.length===0&&this.spawnBoss()}spawnBoss(){const e=this.catalog.levels[this.gameState.campaign.currentLevel].boss;if(!e)return;const t=this.catalog.enemies[e],n=this.catalog.levels[this.gameState.campaign.currentLevel],i={x:0,z:Math.max(this.catalog.player.minZ+this.catalog.rules.bossSpawnMargin,this.gameState.player.position.z-this.catalog.rules.bossDistance)};this.world.resolveObstacleCollision(i,t.radius);const s=this.allocateEnemyId(),a=this.getBossHealth(t.health*t.healthMultiplier,n),o=mi.createBoss(s,e,i,a,this.random);this.gameState.enemies.push(o),this.gameState.mission.status="boss-active",this.recordEvent({type:"patrol-cleared"}),this.recordEvent({enemyId:o.id,type:"boss-arrived"})}clearLevelState(){this.gameState.enemies.length=0,this.gameState.pendingPlayerProjectiles.length=0,this.gameState.pendingEnemyProjectiles.length=0,this.gameState.projectiles.length=0,this.gameState.pickups.length=0,this.gameState.radios.length=0,this.gameState.collectedInteractableKeys.length=0,this.gameState.spawnQueue.length=0,this.gameState.obstacles.length=0,this.gameState.worldSegments.length=0,this.gameState.session.spawnDelaySeconds=0}prepareLevel(e,t){const n=this.gameState.player,i=this.catalog.rules;n.health=i.playerInitialHealth,n.invulnerableSeconds=i.levelInvulnerableSeconds,n.position.x=i.playerInitialX,n.position.z=i.playerInitialZ,n.velocity.x=0,n.velocity.z=0,n.score+=t,this.gameState.campaign.currentLevel=e,this.gameState.elapsedSeconds=0;const s=this.gameState.mission;s.progress=0,s.status="in-progress",s.transitionSeconds=0,s.wave=0,this.world.sync(),this.spawnWave(0)}spawnWave(e){const t=this.catalog.rules;this.gameState.mission.wave=e;const n=Math.min((t.waveEnemyCountBase+Math.floor(e/t.waveEnemyCountStep))*t.waveEnemyCountScale,t.waveEnemyCountCap),i=Math.max(1,Math.round(n*this.catalog.mission.initialSpawnCountMultiplier)),s=this.catalog.levels[this.gameState.campaign.currentLevel],a=this.gameState.campaign.difficulty==="hard"&&e===0?s.hardOpeningPair:void 0;for(let o=0;o<i;o+=1){let c=this.chooseEnemyKind(e),l;const h=s.encounterSchedule.find(d=>d.wave===e&&d.slot===o);h&&(c=h.kind),a&&o===0&&(c=a.pressure,l="pressure"),a&&o===1&&(c=a.flank,l="flank"),this.gameState.spawnQueue.push({kind:c,offsetZ:t.spawnOffsetMinimum+this.random.next()*t.spawnOffsetVariance,x:(this.random.next()-.5)*t.spawnXRange,...l?{tacticalRole:l}:{}})}e>1&&e%t.turretWaveInterval===0&&this.gameState.spawnQueue.push({kind:"turret",offsetZ:t.turretSpawnOffset,x:e%2===0?-t.turretSpawnX:t.turretSpawnX})}chooseEnemyKind(e){const t=this.catalog.rules,n=this.catalog.levels[this.gameState.campaign.currentLevel].enemyPool;if(n==="desert")return this.chooseDesertEnemyKind(e);if(n==="frozen")return this.chooseFrozenEnemyKind(e);if(e<t.jungleOpeningCount)return"grunt";const i=this.random.next();return i<t.jungleGunnerThreshold?"grunt":i<t.jungleHeavyThreshold?"gunner":"heavy"}chooseDesertEnemyKind(e){const t=this.catalog.rules,n=this.random.next();return e<t.desertOpeningCount?n<t.desertRaiderThreshold?"raider":"sniper":n<t.desertSniperThreshold?"raider":n<t.desertSniperUpperThreshold?"sniper":n<t.desertBomberThreshold?"bomber":"heavy"}chooseFrozenEnemyKind(e){const t=this.catalog.rules,n=this.random.next();return e<t.frozenOpeningCount?n<t.frozenOpeningDroneThreshold?"drone":"sniper":n<t.frozenDroneThreshold?"drone":n<t.frozenSniperThreshold?"sniper":n<t.frozenShieldThreshold?"shield":"heavy"}advanceSpawnQueue(e){const t=this.gameState.session,n=this.catalog.mission;if(t.spawnDelaySeconds=Math.max(0,t.spawnDelaySeconds-e),t.spawnDelaySeconds>0||this.gameState.spawnQueue.length===0)return;let i=0;for(;i<n.spawnBatchSize&&this.gameState.enemies.length<n.maxEnemies;){const s=this.gameState.spawnQueue.shift();if(!s)break;this.spawnEnemy(s),i+=1}i>0&&(t.spawnDelaySeconds=n.spawnDelaySeconds)}spawnEnemy(e){const{kind:t}=e,n=this.allocateEnemyId(),i={x:e.x,z:Math.max(this.catalog.player.minZ+this.catalog.rules.bossSpawnMargin,this.gameState.player.position.z-e.offsetZ)},s=this.catalog.levels[this.gameState.campaign.currentLevel],a=this.catalog.enemies[t],o=this.getEnemyHealth(a.health*a.healthMultiplier,s),c=mi.createEnemy(n,t,i,o,this.random);e.tacticalRole&&(c.tacticalRole=e.tacticalRole),this.world.resolveObstacleCollision(c.position,this.catalog.enemies[t].radius),this.gameState.enemies.push(c),this.recordEvent({enemyId:c.id,type:"encounter-spawned"})}getEnemyHealth(e,t){const n=this.gameState.campaign.difficulty==="hard"?t.hardEnemyHealthMultiplier:1;return e*t.enemyHealthMultiplier*n}getBossHealth(e,t){const n=this.gameState.campaign.difficulty==="hard"?t.hardBossHealthMultiplier:1;return e*t.enemyHealthMultiplier*n}allocateEnemyId(){const e=this.gameState.session.nextEnemyId;return this.gameState.session.nextEnemyId+=1,e}}class hM{constructor(e){this.session=e}next(){this.session.randomState+=1831565813;let e=this.session.randomState;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}}const sd=.001;class dM{constructor(e,t,n,i){w(this,"obstaclesBySegment",new Map);w(this,"obstaclesById",new Map);w(this,"indexedObstacleCount",0);this.gameState=e,this.random=t,this.catalog=n,this.authoredInteractables=i}sync(){this.ensureObstacleIndex();const e=this.catalog.player,t=this.catalog.world,n=e.maxZ-this.gameState.player.position.z,i=Math.floor(n/t.segmentLength),s=t.segmentCount-1,a=Math.max(0,Math.min(s,i)),o=Math.max(0,a-t.activeSegmentsBehind),c=Math.min(t.segmentCount-1,a+t.activeSegmentsAhead);this.removeInactiveSegments(o,c),this.removeInactiveObstacles(o,c);for(let l=o;l<=c;l+=1)this.gameState.worldSegments.includes(l)||(this.gameState.worldSegments.push(l),this.populateSegment(l));this.retireUnloadedEntities(e.maxZ-o*t.segmentLength,e.maxZ-(c+1)*t.segmentLength)}resolveObstacleCollision(e,t){for(const n of this.gameState.obstacles){const i=n.position,s=e.x-i.x,a=e.z-i.z,o=t+n.radius,c=Math.hypot(s,a);if(c>=o)continue;if(c<sd){e.x=i.x+o;continue}const l=Math.max(sd,c);e.x=i.x+s/l*o,e.z=i.z+a/l*o}}getObstacle(e){return this.ensureObstacleIndex(),this.obstaclesById.get(e)}getNearbyObstacleCandidates(e,t,n){this.ensureObstacleIndex();const i=this.catalog.player,s=this.catalog.world,a=[],o=i.maxZ-e.z,c=Math.floor(o/s.segmentLength),l=Math.ceil(t/s.segmentLength)+1,h=Math.max(0,c-l),d=Math.min(s.segmentCount-1,c+l),u=t**2;for(let f=h;f<=d;f+=1)this.insertNearbyCandidates(this.obstaclesBySegment.get(f)??[],e,u,n,a);return a.map(f=>f.obstacle)}removeObstacle(e){const t=this.gameState.obstacles,n=t.indexOf(e);n<0||(t.splice(n,1),this.obstaclesById.delete(e.id),this.removeFromSegmentIndex(e),this.indexedObstacleCount=t.length)}removeInactiveSegments(e,t){const n=this.gameState.worldSegments;for(let i=n.length-1;i>=0;i-=1){const s=n[i],a=s!==void 0&&s>=e&&s<=t;s===void 0||a||n.splice(i,1)}}removeInactiveObstacles(e,t){const n=this.gameState.obstacles;for(let i=n.length-1;i>=0;i-=1){const s=n[i];s&&(s.segment<e||s.segment>t)&&(n.splice(i,1),this.obstaclesById.delete(s.id),this.removeFromSegmentIndex(s))}this.indexedObstacleCount=n.length}retireUnloadedEntities(e,t){this.removeOutsideRange(this.gameState.enemies,e,t),this.removeOutsideRange(this.gameState.pickups,e,t),this.removeOutsideRange(this.gameState.projectiles,e,t),this.removeOutsideRange(this.gameState.radios,e,t)}removeOutsideRange(e,t,n){for(let i=e.length-1;i>=0;i-=1){const s=e[i];s&&(s.position.z>t||s.position.z<n)&&e.splice(i,1)}}populateSegment(e){const t=this.gameState.session,n=this.catalog.levels[this.gameState.campaign.currentLevel],i=mi.createSegmentObstacles(e,t.nextObstacleId,this.catalog.player.maxZ,this.catalog.world.segmentLength,this.random,n.obstacleKinds,this.catalog.obstacles);t.nextObstacleId+=i.length,this.gameState.obstacles.push(...i),this.applyBlockingObstaclePlacements(e,n.blockingObstacles,i),this.populateAuthoredInteractables(e),this.indexSegmentObstacles(e)}applyBlockingObstaclePlacements(e,t,n){const i=t.filter(a=>a.segment===e),s=Math.max(0,n.length-i.length);for(let a=0;a<i.length;a+=1){const o=i[a],c=n[s+a];!o||!c||(c.kind=o.kind,c.position.x=o.x,c.position.z=this.segmentOriginZ(e)+o.z,c.health=this.catalog.obstacles[o.kind].health,c.radius=this.catalog.obstacles[o.kind].radius)}}populateAuthoredInteractables(e){const t=this.gameState.campaign.currentLevel,n=this.gameState.session;for(const i of this.authoredInteractables[t]??[]){if(!cu(i.scope,i.segment,i.segmentEnd,e))continue;const s=ou(i.id,e);if(this.gameState.collectedInteractableKeys.includes(s))continue;const a={x:i.x,z:this.segmentOriginZ(e)+i.z};if(i.kind==="crate"){this.gameState.obstacles.push(this.createAuthoredCrate(n.nextObstacleId,i,a,s,e)),n.nextObstacleId+=1;continue}this.gameState.radios.push({id:n.nextRadioId,position:a,presentationId:s,segment:e}),n.nextRadioId+=1}}createAuthoredCrate(e,t,n,i,s){return{health:this.catalog.obstacles.crate.health,id:e,kind:"crate",position:n,presentationId:i,radius:t.radius,segment:s}}segmentOriginZ(e){const t=this.catalog.world.segmentLength;return this.catalog.player.maxZ-t/2-e*t}ensureObstacleIndex(){const e=this.gameState.obstacles;if(this.indexedObstacleCount!==e.length){this.obstaclesBySegment.clear(),this.obstaclesById.clear();for(const t of e)this.addObstacleToIndex(t);this.indexedObstacleCount=e.length}}indexSegmentObstacles(e){for(const t of this.gameState.obstacles)t.segment===e&&this.addObstacleToIndex(t);this.indexedObstacleCount=this.gameState.obstacles.length}addObstacleToIndex(e){const t=this.obstaclesBySegment.get(e.segment)??[];t.push(e),this.obstaclesBySegment.set(e.segment,t),this.obstaclesById.set(e.id,e)}removeFromSegmentIndex(e){const t=this.obstaclesBySegment.get(e.segment);if(!t)return;const n=t.indexOf(e);n>=0&&t.splice(n,1),t.length===0&&this.obstaclesBySegment.delete(e.segment)}insertNearbyCandidates(e,t,n,i,s){for(const a of e){const o=Bt(t,a.position);if(o>n)continue;let c=0;for(;c<s.length&&s[c].distanceSquared<=o;)c+=1;c>=i||(s.splice(c,0,{obstacle:a,distanceSquared:o}),s.length>i&&s.pop())}}}class uM{constructor(e,t,n=t.initialLevel,i={}){w(this,"gameState");w(this,"random");w(this,"world");w(this,"combat");w(this,"missionProgression");w(this,"playerObstacleCollision");this.catalog=t,this.playerObstacleCollision=i.playerObstacleCollision!=="disabled";const s=this.catalog.rules;this.gameState={campaign:{currentLevel:n,difficulty:i.difficulty??"normal"},elapsedSeconds:0,enemies:[],events:[],mission:{progress:0,status:"in-progress",transitionSeconds:0,wave:0},obstacles:[],pickups:[],player:{health:s.playerInitialHealth,hits:0,invulnerableSeconds:0,kills:0,position:{x:s.playerInitialX,z:s.playerInitialZ},score:0,shots:0,velocity:{x:0,z:0},weapon:"rifle"},pendingPlayerProjectiles:[],pendingEnemyProjectiles:[],projectiles:[],radios:[],collectedInteractableKeys:[],session:{fireCooldownSeconds:0,nextEnemyId:1,nextEventId:1,nextObstacleId:1,nextPickupId:1,nextProjectileId:1,nextRadioId:1,randomState:e>>>0,spawnDelaySeconds:0},spawnQueue:[],worldSegments:[]},this.random=new hM(this.gameState.session),this.world=new dM(this.gameState,this.random,this.catalog,i.authoredInteractables??vy),this.combat=new eM(this.gameState,this.catalog,this.random,this.world,a=>this.recordEvent(a)),this.missionProgression=new lM(this.gameState,this.catalog,this.random,this.world,a=>this.recordEvent(a)),this.world.sync(),this.missionProgression.start()}get state(){return this.gameState}advance(e,t){this.gameState.events.length=0;const n=this.gameState.mission,i=n.status;if(i==="failed"||i==="level-complete")return;const s=Math.max(0,Math.min(t,.033));if(this.gameState.elapsedSeconds+=s,i==="level-transition"){this.missionProgression.advanceLevelTransition(s);return}this.gameState.session.fireCooldownSeconds=Math.max(0,this.gameState.session.fireCooldownSeconds-s),this.gameState.player.invulnerableSeconds=Math.max(0,this.gameState.player.invulnerableSeconds-s),this.movePlayer(e,s),this.world.sync(),this.combat.advanceScheduledProjectiles(s),this.combat.tryFireWeapon(e),this.combat.advanceEnemies(s),this.combat.advanceProjectiles(s),this.combat.advancePickups(s),this.combat.advanceRadios(),(n.status==="in-progress"||n.status==="boss-pending")&&this.missionProgression.advance(s)}movePlayer(e,t){const n=this.gameState.player,i=this.catalog.player,s=n.position,a=n.velocity;n.weapon=e.weapon;const o=Math.max(1,Math.hypot(e.moveX,e.moveZ)),c=1-Math.exp(-this.catalog.rules.playerAcceleration*t);a.x+=(e.moveX/o*i.speed-a.x)*c,a.z+=(e.moveZ/o*i.speed-a.z)*c,s.x=Math.max(i.minX,Math.min(i.maxX,s.x+a.x*t)),s.z=Math.max(i.minZ,Math.min(i.maxZ,s.z+a.z*t)),this.playerObstacleCollision&&this.world.resolveObstacleCollision(s,i.radius),s.x=Math.max(i.minX,Math.min(i.maxX,s.x)),s.z=Math.max(i.minZ,Math.min(i.maxZ,s.z))}recordEvent(e){const t=this.allocateEventId();this.gameState.events.push({...e,id:t})}allocateEventId(){const e=this.gameState.session.nextEventId;return this.gameState.session.nextEventId+=1,e}}class In{constructor(){w(this,"eventStatus",In.requireElement("#event-status"));w(this,"healthStatus",In.requireElement("#health-status"));w(this,"missionStatus",In.requireElement("#mission-status"));w(this,"operationStatus",In.requireElement("#operation-name"));w(this,"scoreStatus",In.requireElement("#score-status"));w(this,"weaponStatus",In.requireElement("#weapon-status"));w(this,"messageExpiresAt",0)}reset(){this.eventStatus.textContent=Qe.hud.resetEvent,this.messageExpiresAt=Qe.hud.messageDurationSeconds}showMessage(e,t){this.eventStatus.textContent=e,this.messageExpiresAt=t}render(e){const t=e.player,n=e.events,i=Qe.hud;if(this.healthStatus.textContent=i.healthPrefix+Math.ceil(t.health),this.operationStatus.textContent=i.operationPrefix+In.levelName(e.campaign.currentLevel),this.missionStatus.textContent=this.describeMission(e),this.scoreStatus.textContent=i.scorePrefix+t.score+i.killsSeparator+t.kills,this.weaponStatus.textContent=i.weaponPrefix+t.weapon.toUpperCase()+i.weaponControlsSuffix,n.length>0){this.eventStatus.textContent=this.describeEvents(n,e.campaign.currentLevel);let s=i.messageDurationSeconds;n.some(a=>a.type==="level-transitioned")&&(s=i.levelIntroDurationSeconds),n.some(a=>a.type==="boss-arrived")&&(s=i.bossAlertDurationSeconds),this.messageExpiresAt=e.elapsedSeconds+s}else e.elapsedSeconds>=this.messageExpiresAt&&(this.eventStatus.textContent="")}describeEvents(e,t){const n=new Set;for(const i of e){const s=this.describeEvent(i,t);s&&n.add(s)}return[...n].join(" ")}describeEvent(e,t){switch(e.type){case"boss-arrived":return Qe.bossAlerts[t];case"boss-destroyed":return Qe.bossDestroyed[t];case"encounter-spawned":case"enemy-hit":case"enemy-destroyed":case"obstacle-hit":case"obstacle-destroyed":case"explosion":case"mission-failed":case"patrol-cleared":case"pickup-collected":case"radio-collected":case"player-damaged":return Qe.events[e.type];case"level-transitioned":return Qe.levelIntros[e.level];case"weapon-fired":return Qe.events[e.type].replace("{weapon}",e.weapon.toUpperCase())}}describeMission(e){const t=e.mission,n=e.campaign,i=Qe.hud,s=Math.floor(t.progress*100);switch(t.status){case"in-progress":return In.levelName(n.currentLevel)+i.inProgressSeparator+s+i.progressSuffix+i.waveSeparator+(t.wave+1);case"boss-pending":return i.patrolClearancePrefix+s+i.progressSuffix;case"boss-active":return i.bossPrefix[n.currentLevel]+s+i.progressSuffix;case"level-transition":return i.transitioning[n.currentLevel];case"level-complete":return i.campaignComplete;case"failed":return Qe.results.failed.title}}static levelName(e){return Qe.levels[e]}static requireElement(e){const t=document.querySelector(e);if(!t)throw new Error(`Required HUD element is missing: ${e}`);return t}}function fM(){document.fullscreenElement||!document.documentElement.requestFullscreen||document.documentElement.requestFullscreen().then(()=>{const r=screen.orientation;if(!("lock"in r)||typeof r.lock!="function")return;const e=r.lock("landscape");e instanceof Promise&&e.catch(()=>{})}).catch(()=>{})}const pM=1e3;class Ft{constructor(e,t,n,i=t.initialLevel){w(this,"hud",new In);w(this,"audioLifecycle");w(this,"scene");w(this,"input");w(this,"startScreen",Ft.requireElement("#start-screen"));w(this,"pauseScreen",Ft.requireElement("#pause-screen"));w(this,"endScreen",Ft.requireElement("#end-screen"));w(this,"rotateScreen",Ft.requireElement("#rotate-screen"));w(this,"pauseButton",Ft.requireElement("#pause-button"));w(this,"startButton",Ft.requireElement("#start-button"));w(this,"resumeButton",Ft.requireElement("#resume-button"));w(this,"restartButton",Ft.requireElement("#restart-button"));w(this,"pauseRestartButton",Ft.requireElement("#pause-restart-button"));w(this,"endStats",Ft.requireElement("#end-stats"));w(this,"endTitle",Ft.requireElement("#end-title"));w(this,"endMessage",Ft.requireElement("#end-message"));w(this,"cameraButton",Ft.requireElement("#camera-button"));w(this,"autoplayConfig",Iu(window.location.search));w(this,"difficulty",Zu(window.location.search));w(this,"autoplayController",new Ru);w(this,"autoplayMetrics");w(this,"autoplayIndicator",Ft.createAutoplayIndicator(this.autoplayConfig));w(this,"transition");w(this,"portraitQuery",window.matchMedia("(pointer: coarse) and (orientation: portrait)"));w(this,"session");w(this,"previousFrameTime",performance.now());w(this,"started",!1);w(this,"paused",!1);this.catalog=t,this.sceneryCatalog=n,this.initialLevel=i,this.session=this.createSession(),this.autoplayMetrics=new Du(this.catalog),this.autoplayMetrics.reset(this.session.state),this.audioLifecycle=new Yu(()=>this.started,()=>this.started&&!this.paused,()=>this.togglePause(),this.catalog,()=>this.session.state.campaign.currentLevel),this.applyStaticCopy(),this.scene=new $y(e,this.catalog,this.sceneryCatalog),this.onWeaponChanged=this.onWeaponChanged.bind(this),this.input=new mc(e,this.scene.getWorldPosition.bind(this.scene),this.getPlayerPosition.bind(this),this.onWeaponChanged),this.transition=new _c(this.input),this.onAnimationFrame=this.onAnimationFrame.bind(this),this.onResize=this.onResize.bind(this),this.onKeyDown=this.onKeyDown.bind(this),this.onBlur=this.onBlur.bind(this),this.startMission=this.startMission.bind(this),this.resumeMission=this.resumeMission.bind(this),this.togglePause=this.togglePause.bind(this),this.cycleCamera=this.cycleCamera.bind(this),this.startButton.addEventListener("click",this.startMission),this.restartButton.addEventListener("click",this.startMission),this.pauseRestartButton.addEventListener("click",this.startMission),this.resumeButton.addEventListener("click",this.resumeMission),this.pauseButton.addEventListener("click",this.togglePause),this.cameraButton.addEventListener("click",this.cycleCamera),window.addEventListener("resize",this.onResize),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("blur",this.onBlur),this.audioLifecycle.attach(),this.scene.resize(),this.updateRotationNotice()}start(){this.autoplayConfig.enabled&&this.startMission(),this.scene.setAnimationLoop(this.onAnimationFrame)}dispose(){window.removeEventListener("resize",this.onResize),window.removeEventListener("keydown",this.onKeyDown),window.removeEventListener("blur",this.onBlur),this.audioLifecycle.dispose(),this.startButton.removeEventListener("click",this.startMission),this.restartButton.removeEventListener("click",this.startMission),this.pauseRestartButton.removeEventListener("click",this.startMission),this.resumeButton.removeEventListener("click",this.resumeMission),this.pauseButton.removeEventListener("click",this.togglePause),this.cameraButton.removeEventListener("click",this.cycleCamera),this.input.dispose(),this.scene.dispose(),this.transition.dispose(),this.autoplayIndicator.remove()}getPlayerPosition(){return this.session.state.player.position}getAutoplayMetrics(){return this.autoplayMetrics.snapshot(this.session.state)}createSession(){const e=ef(this.catalog,this.sceneryCatalog,this.autoplayConfig.enabled,this.difficulty);return new uM(20260922,this.catalog,this.initialLevel,e)}startMission(){this.autoplayConfig.enabled||fM(),this.session=this.createSession();const{player:e}=this.session.state;this.autoplayMetrics.reset(this.session.state),this.transition.reset(),this.hud.reset(),this.scene.resetView(e.position),this.input.resetForLevel(e.position,e.weapon),this.audioLifecycle.beginMission(!this.autoplayConfig.enabled),this.started=!0,this.paused=!1,this.previousFrameTime=performance.now(),this.startScreen.hidden=!0,this.pauseScreen.hidden=!0,this.endScreen.hidden=!0,this.pauseButton.hidden=this.autoplayConfig.enabled,this.cameraButton.hidden=this.autoplayConfig.enabled,this.updateCameraButton(),this.pauseButton.textContent=Qe.controls.pauseSymbol,this.updateRotationNotice()}togglePause(){this.autoplayConfig.enabled||!this.started||this.session.state.mission.status==="failed"||(this.paused=!this.paused,this.pauseScreen.hidden=!this.paused,this.pauseButton.textContent=this.paused?Qe.controls.resumeSymbol:Qe.controls.pauseSymbol,this.paused&&this.input.clearHeldInput(),this.audioLifecycle.setPaused(this.paused),this.previousFrameTime=performance.now())}resumeMission(){this.paused&&this.togglePause()}onAnimationFrame(){const e=performance.now();this.transition.update(e);const t=Math.min((e-this.previousFrameTime)/pM,.033);this.previousFrameTime=e;const n=this.getPlayerCommand();this.started&&!this.paused&&(this.transition.isBlockingGameplay||this.advanceSession(n,t,e));const i=this.session.state,s=i.mission.status;(s==="failed"||s==="level-complete")&&this.started&&this.showEnd(),this.hud.render(i),this.scene.render(i,n.aim)}showEnd(){this.started=!1,this.transition.reset(),this.input.clearHeldInput();const{mission:e,campaign:t,player:n}=this.session.state,i=Qe.results,s=this.isCampaignComplete(),a=Math.min(100,Math.round(n.hits/Math.max(1,n.shots)*100));let o=i.victory;e.status==="failed"?o=i.failed:s||(o=i.levelOutros[t.currentLevel]),this.endTitle.textContent=o.title,this.endMessage.textContent=o.message,this.audioLifecycle.finishMission(s&&e.status!=="failed"),this.endStats.textContent=i.scorePrefix+n.score+i.killsSeparator+n.kills+i.accuracySeparator+a+i.accuracySuffix,this.endScreen.hidden=!1,this.pauseButton.hidden=!0,this.cameraButton.hidden=!0}presentEvents(e){this.transition.presentEvents(this.session.state,e,this.isCampaignComplete()),this.audioLifecycle.playEvents(this.session.state.events)}onKeyDown(e){e.code==="KeyC"&&this.cycleCamera(),(e.code==="Escape"||e.code==="KeyP")&&this.togglePause()}cycleCamera(){this.autoplayConfig.enabled||!this.started||(this.scene.cycleCameraMode(this.session.state.player.position),this.updateCameraButton())}updateCameraButton(){const e=this.scene.currentCameraMode,t=Qe.controls.cameraModes[e];this.cameraButton.textContent=t,this.cameraButton.setAttribute("aria-label",Qe.accessibility.cameraButton+": "+t)}onBlur(){this.started&&!this.paused&&this.togglePause()}onWeaponChanged(e){this.autoplayConfig.enabled||!this.started||(this.hud.showMessage(e.toUpperCase(),this.session.state.elapsedSeconds+Qe.hud.weaponSelectionDurationSeconds),this.audioLifecycle.playWeaponSelection(e))}getPlayerCommand(){return this.autoplayConfig.enabled?this.autoplayController.createCommand(this.session.state):this.input.command}advanceSession(e,t,n){const i=this.session.state;let s=t*this.autoplayConfig.timeScale;for(;s>1e-6;){const a=Math.min(s,.033);this.session.advance(e,a),this.autoplayMetrics.observe(i,a);const o=this.hasLevelTransitioned();if(this.presentEvents(n),s-=a,o&&this.input.resetForLevel(i.player.position,i.player.weapon),this.isTerminalMission()||o)break}}isTerminalMission(){const e=this.session.state.mission.status;return e==="failed"||e==="level-complete"}hasLevelTransitioned(){return this.session.state.events.some(e=>e.type==="level-transitioned")}isCampaignComplete(){return this.catalog.levels[this.session.state.campaign.currentLevel].next===void 0}onResize(){this.scene.resize(),this.updateRotationNotice()}updateRotationNotice(){this.rotateScreen.hidden=!this.portraitQuery.matches}applyStaticCopy(){const{accessibility:e,page:t,hud:n}=Qe;document.title=e.game,this.setAccessibleLabel("#game",e.game),this.setAccessibleLabel("#hud",e.hud),this.setAccessibleLabel("#touch-controls",e.touchControls),this.setAccessibleLabel("#move-stick",e.moveStick),this.setAccessibleLabel("#aim-stick",e.aimStick),this.setAccessibleLabel("#weapon-buttons",e.weapons),this.setAccessibleLabel("#start-screen",e.startScreen),this.setAccessibleLabel("#pause-screen",e.pauseScreen),this.setAccessibleLabel("#end-screen",e.resultScreen),this.setAccessibleLabel("#pause-button",e.pauseButton),this.setAccessibleLabel("#camera-button",e.cameraButton),this.setText("#game-title-first",t.titleFirstLine),this.setText("#game-title-second",t.titleSecondLine),this.setText("#operation-name",this.initialOperationName()),this.setText("#mission-status",n.initialMission),this.setText("#health-status",n.initialHealth),this.setText("#score-status",n.initialScore),this.setText("#weapon-status",n.initialWeapon),this.setText("#event-status",n.initialEvent),this.setText("#pause-button",Qe.controls.pauseSymbol),this.setText("#move-caption",t.moveCaption),this.setText("#aim-caption",t.aimCaption),this.setText("#rifle-button",t.weaponButtons[0]),this.setText("#shotgun-button",t.weaponButtons[1]),this.setText("#rocket-button",t.weaponButtons[2]),this.setText("#start-operation-name",this.initialOperationName()),this.setText("#start-heading",t.startHeading),this.setText("#start-description",t.startDescription),this.startButton.textContent=t.startButton,this.setText("#pause-heading",t.pauseHeading),this.resumeButton.textContent=t.resumeButton,this.pauseRestartButton.textContent=t.restartButton,this.endTitle.textContent=Qe.results.failed.title,this.endMessage.textContent=Qe.results.failed.message,this.restartButton.textContent=t.playAgainButton,this.setText("#rotate-screen",t.rotateNotice)}setAccessibleLabel(e,t){Ft.requireElement(e).setAttribute("aria-label",t)}setText(e,t){Ft.requireElement(e).textContent=t}initialOperationName(){return Qe.hud.operationPrefix+Qe.levels[this.initialLevel]}static createAutoplayIndicator(e){const t=document.createElement("div");return t.className="autoplay-indicator",t.textContent=Qe.autoplay.indicator+" "+e.timeScale+"X",t.hidden=!e.enabled,t.setAttribute("aria-label",Qe.accessibility.autoplayMode),document.getElementById("game")?.append(t),t}static requireElement(e){const t=document.querySelector(e);if(!t)throw new Error(`Required element is missing: ${e}`);return t}}const tr=["jungle-front","desert-refinery","frozen-fortress"],mM=["minDirectionLength","playerInitialX","playerInitialZ","playerInitialHealth","pickupExpirySeconds","healthPickupAmount","weaponPickupScore","enemyContactDistance","enemySeenDistance","enemyRetireDistance","enemyMaxSpeed","bossDistance","bossSpawnMargin","shotgunPelletCount","shotgunSpread","shotgunMuzzleLateralJitter","shotgunMuzzleForwardJitter","shotgunPelletDelaySeconds","pickupHealthChance","pickupSpawnChance","cratePickupChance","crateHealthChance","playerInvulnerableSeconds","levelInvulnerableSeconds","rocketExpiredRadius","rocketExpiredDamageScale","turretWaveInterval","turretSpawnOffset","turretSpawnX","spawnOffsetMinimum","spawnOffsetVariance","spawnXRange","desertOpeningCount","desertRaiderThreshold","desertSniperThreshold","desertSniperUpperThreshold","desertBomberThreshold","jungleOpeningCount","jungleGunnerThreshold","jungleHeavyThreshold","frozenOpeningCount","frozenOpeningDroneThreshold","frozenDroneThreshold","frozenSniperThreshold","frozenShieldThreshold","waveEnemyCountBase","waveEnemyCountStep","waveEnemyCountCap","waveEnemyCountScale","enemyXMargin","enemyApproachRetreatRatio","enemyRetreatSpeed","rocketDamageFalloff","playerMaxHealth","playerAcceleration","distanceEpsilon","enemyStrafeFrequency","enemyStrafeAmplitude","hardAimLeadSeconds","hardStrafeAmplitudeMultiplier","hardDodgeDistance","hardDodgeCooldown","hardDodgeLookaheadSeconds","hardEnemySpeedMultiplier","hardEnemyFireRateMultiplier","hardEnemyProjectileSpeedMultiplier","hardCoverDecisionInterval","hardCoverMaxDistance","hardCoverPeekDistance","hardCoverTimeoutSeconds","hardCoverSearchLimit","hardCoverExposureSeconds","hardCoverRepositionAngleDot","hardFlankDistance","hardFlankTimeoutSeconds","hardRetreatHealthRatio","hardRetreatDistance","hardRetreatDurationSeconds","hardRetreatCooldownSeconds"],gs=["grunt","gunner","heavy","turret","boss_tank","raider","sniper","bomber","boss_crawler","drone","shield","boss_mech"],Yc=["tree","rock","crate","wall","barrel","wreck","roadblock","bunker"],gM=["rifle","shotgun","rocket"],_M=["pickupHealthChance","pickupSpawnChance","cratePickupChance","crateHealthChance","desertRaiderThreshold","desertSniperThreshold","desertSniperUpperThreshold","desertBomberThreshold","jungleGunnerThreshold","jungleHeavyThreshold","frozenOpeningDroneThreshold","frozenDroneThreshold","frozenSniperThreshold","frozenShieldThreshold"];function It(r,e){if(typeof r!="object"||r===null||Array.isArray(r))throw new Error(`${e} must be an object`);return r}function Zc(r,e){if(!Array.isArray(r))throw new Error(`${e} must be an array`);return r}function Ie(r,e){if(typeof r!="number"||!Number.isFinite(r))throw new Error(`${e} must be a finite number`);return r}function Js(r,e,t){return r===void 0?t:Ie(r,e)}function xM(r,e,t){return r===void 0?t:vM(r,e)}function vM(r,e){if(typeof r!="boolean")throw new Error(`${e} must be a boolean`);return r}function vn(r,e){if(typeof r!="string")throw new Error(`${e} must be a string`);return r}function SM(r,e){return r===void 0?[]:Zc(r,e).map((n,i)=>{const s=It(n,`${e}[${i}]`),a=vn(s.kind,`${e}[${i}].kind`);if(!Yc.includes(a))throw new Error(`Unknown obstacle kind: ${a}`);return{kind:a,segment:Ie(s.segment,`${e}[${i}].segment`),x:Ie(s.x,`${e}[${i}].x`),z:Ie(s.z,`${e}[${i}].z`)}})}function yM(r,e){if(r===void 0)return;const t=It(r,e),n=vn(t.pressure,`${e}.pressure`),i=vn(t.flank,`${e}.flank`);for(const s of[n,i])if(!gs.includes(s))throw new Error(`Unknown opening pair enemy kind: ${s}`);return{pressure:n,flank:i}}function MM(r,e){if(r===void 0)return[];const t=Zc(r,e),n=new Set;return t.map((i,s)=>{const a=`${e}[${s}]`,o=It(i,a),c=Ie(o.wave,`${a}.wave`),l=Ie(o.slot,`${a}.slot`),h=vn(o.kind,`${a}.kind`);if(!Number.isSafeInteger(c)||c<0)throw new Error(`${a}.wave must be a non-negative integer`);if(!Number.isSafeInteger(l)||l<0)throw new Error(`${a}.slot must be a non-negative integer`);if(!gs.includes(h))throw new Error(`Unknown scheduled encounter enemy kind: ${h}`);const d=`${c}:${l}`;if(n.has(d))throw new Error(`${e} contains a duplicate wave slot: ${d}`);return n.add(d),{kind:h,slot:l,wave:c}})}function rd(r,e){const t=It(r,e),n={};for(const i of Object.keys(t)){if(!gs.includes(i))throw new Error(`Unknown attack override kind: ${i}`);n[i]=hu(t[i],`${e}.${i}`)}return n}function hu(r,e){const t=It(r,e),n=vn(t.pattern,`${e}.pattern`);if(n!=="jungle"&&n!=="fan")throw new Error(`Unknown attack pattern: ${n}`);return{aimSpread:Ie(t.aimSpread,`${e}.aimSpread`),attackType:EM(t.attackType,`${e}.attackType`),count:Ie(t.count,`${e}.count`),explosionRadius:Js(t.explosionRadius,`${e}.explosionRadius`,0),pattern:n,projectileSpeed:Ie(t.projectileSpeed,`${e}.projectileSpeed`),spreadStep:Ie(t.spreadStep,`${e}.spreadStep`)}}function EM(r,e){if(r===void 0)return"rifle";const t=vn(r,e);if(t!=="rifle"&&t!=="shotgun"&&t!=="grenade"&&t!=="club")throw new Error(`Unknown attack type: ${t}`);return t}function bM(r){const e=It(r,"catalog"),t=TM(e.levels),n=wM(e.enemies),i=AM(e.obstacles),s=RM(e.weapons),a=CM(e.rules),o=PM(e.initialLevel),c=IM(e,o,t,n,i,s,a);return BM(o,t),UM(c),c}function TM(r){const e=It(r,"catalog.levels"),t={};for(const n of tr)t[n]=kM(e[n],`catalog.levels.${n}`);return t}function wM(r){const e=It(r,"catalog.enemies"),t={};for(const n of gs)t[n]=zM(e[n],`catalog.enemies.${n}`);return t}function AM(r){const e=It(r,"catalog.obstacles"),t={};for(const n of Yc){const i=It(e[n],`catalog.obstacles.${n}`);t[n]={health:Ie(i.health,`catalog.obstacles.${n}.health`),radius:Ie(i.radius,`catalog.obstacles.${n}.radius`)}}return t}function RM(r){const e=It(r,"catalog.weapons"),t={};for(const n of gM){const i=It(e[n],`catalog.weapons.${n}`);t[n]={cooldown:Ie(i.cooldown,`catalog.weapons.${n}.cooldown`),damage:Ie(i.damage,`catalog.weapons.${n}.damage`),life:Ie(i.life,`catalog.weapons.${n}.life`),radius:Ie(i.radius,`catalog.weapons.${n}.radius`),speed:Ie(i.speed,`catalog.weapons.${n}.speed`)}}return t}function CM(r){const e=It(r,"catalog.rules"),t={};for(const n of mM)t[n]=Ie(e[n],`catalog.rules.${n}`);return t}function PM(r){const e=vn(r,"catalog.initialLevel");if(!tr.includes(e))throw new Error(`Unknown initial level: ${e}`);return e}function IM(r,e,t,n,i,s,a){return{initialLevel:e,combat:LM(r.combat),desertAttackOverrides:rd(r.desertAttackOverrides,"catalog.desertAttackOverrides"),frozenAttackOverrides:rd(r.frozenAttackOverrides,"catalog.frozenAttackOverrides"),enemies:n,levels:t,rules:a,mission:DM(r.mission),obstacles:i,player:NM(r.player),weapons:s,world:FM(r.world)}}function LM(r){const e=It(r,"catalog.combat");return{barrelExplosionDamage:Ie(e.barrelExplosionDamage,"catalog.combat.barrelExplosionDamage"),barrelExplosionRadius:Ie(e.barrelExplosionRadius,"catalog.combat.barrelExplosionRadius"),enemyProjectileLifeSeconds:Ie(e.enemyProjectileLifeSeconds,"catalog.combat.enemyProjectileLifeSeconds"),enemyProjectileRadius:Ie(e.enemyProjectileRadius,"catalog.combat.enemyProjectileRadius"),obstacleExplosionRadius:Ie(e.obstacleExplosionRadius,"catalog.combat.obstacleExplosionRadius"),pickupDistance:Ie(e.pickupDistance,"catalog.combat.pickupDistance"),rocketImpactRadius:Ie(e.rocketImpactRadius,"catalog.combat.rocketImpactRadius")}}function DM(r){const e=It(r,"catalog.mission");return{bossTransitionSeconds:Ie(e.bossTransitionSeconds,"catalog.mission.bossTransitionSeconds"),initialSpawnCountMultiplier:Ie(e.initialSpawnCountMultiplier,"catalog.mission.initialSpawnCountMultiplier"),maxEnemies:Ie(e.maxEnemies,"catalog.mission.maxEnemies"),maxWave:Ie(e.maxWave,"catalog.mission.maxWave"),spawnBatchSize:Ie(e.spawnBatchSize,"catalog.mission.spawnBatchSize"),spawnDelaySeconds:Ie(e.spawnDelaySeconds,"catalog.mission.spawnDelaySeconds"),waveCount:Ie(e.waveCount,"catalog.mission.waveCount")}}function NM(r){const e=It(r,"catalog.player");return{bossThreshold:Ie(e.bossThreshold,"catalog.player.bossThreshold"),maxX:Ie(e.maxX,"catalog.player.maxX"),maxZ:Ie(e.maxZ,"catalog.player.maxZ"),minX:Ie(e.minX,"catalog.player.minX"),minZ:Ie(e.minZ,"catalog.player.minZ"),radius:Ie(e.radius,"catalog.player.radius"),speed:Ie(e.speed,"catalog.player.speed")}}function FM(r){const e=It(r,"catalog.world");return{activeSegmentsAhead:Ie(e.activeSegmentsAhead,"catalog.world.activeSegmentsAhead"),activeSegmentsBehind:Ie(e.activeSegmentsBehind,"catalog.world.activeSegmentsBehind"),segmentCount:Ie(e.segmentCount,"catalog.world.segmentCount"),segmentLength:Ie(e.segmentLength,"catalog.world.segmentLength")}}function UM(r){const e=r.player,t=r.mission;if(e.minX>=e.maxX)throw new Error("catalog.player.minX must be less than maxX");if(e.minZ>=e.maxZ)throw new Error("catalog.player.minZ must be less than maxZ");if(r.world.segmentLength<=0)throw new Error("catalog.world.segmentLength must be greater than zero");if(r.rules.enemyMaxSpeed<=0)throw new Error("catalog enemy speed rule must be greater than zero");if(t.waveCount<=0||t.maxWave<0||t.maxWave>=t.waveCount)throw new Error("catalog.mission wave range is invalid");if(e.bossThreshold<0||e.bossThreshold>1)throw new Error("catalog.player.bossThreshold must be between 0 and 1");for(const n of tr){if(r.levels[n].enemyHealthMultiplier<=0)throw new Error(`catalog.levels.${n}.enemyHealthMultiplier must be greater than zero`);OM(r,n)}for(const n of gs){const i=r.enemies[n];if(i.healthMultiplier<=0||i.speedMultiplier<=0)throw new Error(`catalog.enemies.${n} balance multipliers must be greater than zero`)}for(const n of _M){const i=r.rules[n];if(i<0||i>1)throw new Error(`catalog.rules.${n} must be between 0 and 1`)}}function OM(r,e){const t=r.levels[e].encounterSchedule;for(const n of t){if(n.wave>r.mission.maxWave)throw new Error(`catalog.levels.${e}.encounterSchedule wave exceeds mission.maxWave`);const i=Math.min((r.rules.waveEnemyCountBase+Math.floor(n.wave/r.rules.waveEnemyCountStep))*r.rules.waveEnemyCountScale,r.rules.waveEnemyCountCap),s=Math.max(1,Math.round(i*r.mission.initialSpawnCountMultiplier));if(n.slot>=s)throw new Error(`catalog.levels.${e}.encounterSchedule slot exceeds wave size`);if(ln(n.kind))throw new Error(`catalog.levels.${e}.encounterSchedule cannot schedule a boss`)}}function BM(r,e){const t=new Set;let n=r;for(;;){if(t.has(n))throw new Error(`Campaign level graph contains a cycle at ${n}`);t.add(n);const i=e[n].next;if(i===void 0){if(t.size!==tr.length)throw new Error("Campaign level graph does not reach every level");return}n=i}}function kM(r,e){const t=It(r,e),i=Zc(t.obstacleKinds,`${e}.obstacleKinds`).map((h,d)=>{const u=vn(h,`${e}.obstacleKinds.${d}`);if(!Yc.includes(u))throw new Error(`Unknown obstacle kind: ${u}`);return u});if(i.length===0)throw new Error(`${e}.obstacleKinds must not be empty`);const s=t.next===void 0?void 0:vn(t.next,`${e}.next`),a=SM(t.blockingObstacles,`${e}.blockingObstacles`);if(s!==void 0&&!tr.includes(s))throw new Error(`Unknown next level: ${s}`);const o=t.boss===void 0?void 0:vn(t.boss,`${e}.boss`);if(o!==void 0&&!gs.includes(o))throw new Error(`Unknown boss kind: ${o}`);if(o!==void 0&&!ln(o))throw new Error(`Level boss must be a boss enemy: ${o}`);const c=vn(t.enemyPool,`${e}.enemyPool`);if(c!=="jungle"&&c!=="desert"&&c!=="frozen")throw new Error(`Unknown enemy pool: ${c}`);const l=c;return{bonus:Ie(t.bonus,`${e}.bonus`),enemyHealthMultiplier:Ie(t.enemyHealthMultiplier,`${e}.enemyHealthMultiplier`),hardBossHealthMultiplier:Js(t.hardBossHealthMultiplier,`${e}.hardBossHealthMultiplier`,1),hardEnemyHealthMultiplier:Js(t.hardEnemyHealthMultiplier,`${e}.hardEnemyHealthMultiplier`,1),boss:o,enemyPool:l,hardOpeningPair:yM(t.hardOpeningPair,`${e}.hardOpeningPair`),encounterSchedule:MM(t.encounterSchedule,`${e}.encounterSchedule`),next:s,obstacleKinds:i,blockingObstacles:a}}function zM(r,e){const t=It(r,e);return{attack:hu(t.attack,`${e}.attack`),contactDamage:Ie(t.contactDamage,`${e}.contactDamage`),damage:Ie(t.damage,`${e}.damage`),fireRange:Ie(t.fireRange,`${e}.fireRange`),health:Ie(t.health,`${e}.health`),healthMultiplier:Js(t.healthMultiplier,`${e}.healthMultiplier`,1),range:Ie(t.range,`${e}.range`),radius:Ie(t.radius,`${e}.radius`),score:Ie(t.score,`${e}.score`),speed:Ie(t.speed,`${e}.speed`),speedMultiplier:Js(t.speedMultiplier,`${e}.speedMultiplier`,1),fullSpeedMovement:xM(t.fullSpeedMovement,`${e}.fullSpeedMovement`,!1),cooldown:Ie(t.cooldown,`${e}.cooldown`)}}const GM="./config/level-catalog.json";async function HM(){const r=await fetch(GM);if(!r.ok)throw new Error(`Level catalog request failed: ${r.status}`);const e=await r.json();return bM(e)}const VM="./config/scenery-catalog.json";async function WM(){const r=await fetch(VM);if(!r.ok)throw new Error(`Failed to load scenery catalog: ${r.status}`);const e=await r.json();return uy(e)}function XM(r){const e=new URLSearchParams(r).get("level");if(e==="2")return"desert-refinery";if(e==="3")return"frozen-fortress"}const qM="Unable to load the game configuration.";async function KM(){const r=document.querySelector("#game-canvas");if(!r)throw new Error("New game canvas is missing.");const[e,t]=await Promise.all([HM(),WM()]);new Ft(r,e,t,XM(window.location.search)).start()}KM().catch($M);function $M(r){const e=document.querySelector("#start-description");e&&(e.textContent=qM),console.error(r)}
