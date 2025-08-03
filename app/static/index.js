async function sendText() {
      const text = document.getElementById("text-input").value;

      const res = await fetch("/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: text })
      });

      if (!res.ok) {
        alert("Failed to generate speech");
        return;
      }

      const data = await res.json();
      const audioPlayer = document.getElementById("audio-player");
      audioPlayer.src = data.audio_url;
      audioPlayer.play();
    }