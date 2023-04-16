export default function pop (e) {
	// TEST
let amount = 1;
switch (e.target.dataset.type) {
  case 'shadow':
  case 'line':
  amount = 60;
  break;
}
if (e.clientX === 0 && e.clientY === 0) {
  const bbox = e.target.getBoundingClientRect();
  const x = bbox.left + bbox.width / 2;
  const y = bbox.top + bbox.height / 2;
  for (let i = 0; i < 30; i++) {
		createParticle(x, y, e.target.dataset.type);
  }
  } else {
  for (let i = 0; i < amount; i++) {
		createParticle(e.clientX, e.clientY, e.target.dataset.type);
  }
}
}
function createParticle (x, y, type) {
	const particle = document.createElement('particle');
	document.body.appendChild(particle);
	let width = Math.floor(Math.random() * 150 + 8);
	let height = width;
	let destinationX = (Math.random() - 0.5) * 120;
	let destinationY = (Math.random() - 0.5) * 120;
	let rotation = Math.random() * 100;
	let delay = Math.random() * 200;
	switch (type) {
		case 'square':
		particle.style.background = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`; 
		particle.style.border = '1px solid white';
		break;
		case 'symbol':
		particle.innerHTML = ['&#9884;','&#9731;','&#10084;','&#10052;','&#10054;','&#9733;','&#9787;'][Math.floor(Math.random() * 7)];
		particle.style.color = `hsl(${Math.random() * 50 + 200}, 70%, 60%)`;
		particle.style.fontSize = `${Math.random() * 24 + 10}px`;
		width = height = 'auto';
		break;
		case 'logo':
		particle.style.backgroundImage = 'url(https://www.pngall.com/wp-content/uploads/2016/04/Shovel-Transparent.png)';
		break;
		case 'shadow':
		var color = `hsl(${Math.random() * 50 + 200}, 70%, 50%)`;
		particle.style.boxShadow = `0 0 ${Math.floor(Math.random() * 10 + 10)}px ${color}`;
		particle.style.background = color;
		particle.style.borderRadius = '50%';
		width = height = Math.random() * 5 + 4; 
		break;
		case 'line':
		particle.style.background = `hsl(${Math.random() * 50 + 200}, 70%, 50%)`;
		height = 1; 
		rotation += 1000;
		delay = Math.random() * 1000;
		break;
	}
	particle.style.width = `100px`;
	particle.style.height = `100px`;
	const animation = particle.animate([
		{
			transform: `translate(-50%, -50%) translate(${x}px, ${y}px) rotate(0deg)`,
			opacity: 1
		},
		{
			transform: `translate(-50%, -50%) translate(${x + destinationX}px, ${y + destinationY}px) rotate(${rotation}deg)`,
			opacity: 0
		}
		], {
		duration: Math.random() * 1000 + 2000, 
		easing: 'cubic-bezier(0, .9, .57, 1)',
		delay: delay
	});
	animation.onfinish = removeParticle;
}

function removeParticle (e) {
	e.srcElement.effect.target.remove();
}