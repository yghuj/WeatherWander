const aboutDiv = document.getElementById('about-fade-in');
const h1 = aboutDiv.querySelector('h1');
const p = aboutDiv.querySelector('p');

window.addEventListener('scroll', () => {
	const rect = aboutDiv.getBoundingClientRect();
	const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
	if (isInView) {
		h1.classList.add('animate');
		p.classList.add('animate');}
	else {
		h1.classList.remove('animate');
		p.classList.remove('animate');}
});