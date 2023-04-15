export default function (sound, refs, type = 'grass') {
	if (sound){
		const audio = refs[type]

		if (!audio.paused){
			audio.currentTime = 0
		}

		audio.play()
	}
}
