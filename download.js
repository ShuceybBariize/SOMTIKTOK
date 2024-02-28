document.addEventListener('DOMContentLoaded', async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const tiktokUrl = decodeURIComponent(urlParams.get('url'));
    const isVideo = urlParams.get('isVideo') === 'true';

    const avatar = document.getElementById('avatar');
    const username = document.getElementById('username');
    const videoTitle = document.getElementById('video-title');
    const downloadLink = document.getElementById('download-link');
    const hdDownloadLink = document.getElementById('hd-download-link');
    const buttonRight1 = document.getElementById('button-right-1');
    const buttonRight2 = document.getElementById('button-right-2');

    if (isVideo) {
        // Video info
        try {
            const response = await axios.get(`/videoInfo?url=${encodeURIComponent(tiktokUrl)}`);
            const videoInfo = response.data;

            // Display video info
            avatar.src = videoInfo.avatar;
            username.textContent = `Username: ${videoInfo.username}`;
            videoTitle.textContent = `Video Title: ${videoInfo.title}`;
            downloadLink.href = videoInfo.videoUrl;
            hdDownloadLink.href = videoInfo.hdVideoUrl;
            hdDownloadLink.style.display = 'block'; // Display HD download link if available
        } catch (error) {
            // Handle error
            console.error('Error fetching video info:', error);
        }
    } else {
        // Photo info
        try {
            const response = await axios.get(`/photoInfo?url=${encodeURIComponent(tiktokUrl)}`);
            const photoInfo = response.data;

            // Display photos
            const photoContainer = document.createElement('div');
            photoContainer.classList.add('photo-container');
            for (const photoUrl of photoInfo.photoUrls) {
                const img = document.createElement('img');
                img.src = photoUrl;
                photoContainer.appendChild(img);
            }
            downloadLink.style.display = 'none'; // Hide video download link
            hdDownloadLink.style.display = 'none'; // Hide HD download link
            document.body.appendChild(photoContainer); // Append photo container to the body
        } catch (error) {
            // Handle error
            console.error('Error fetching photo info:', error);
        }
    }

    // Handle download button click
    buttonRight1.addEventListener('click', function () {
        // Implement logic to start the download of the video or photo
        // You can use the downloadLink.href to initiate the download
    });

    buttonRight2.addEventListener('click', function () {
        // Implement logic to start the download of the HD version (if applicable)
        // You can use the hdDownloadLink.href to initiate the download
    });
});
