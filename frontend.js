document.addEventListener('DOMContentLoaded', function () {
    const pasteButton = document.querySelector('.button-paste');
    const textField = document.getElementById('text-field');
    const downloadButton = document.getElementById('download-button');
    const errorMessage = document.getElementById('error-message');
    const loadingRow = document.getElementById('loading-row');
    const redCircle = document.querySelector('.circle.red');
    const blackCircle = document.querySelector('.circle.black');

  
    
    let isClearMode = false;

    function setLoadingState(loading) {
        if (loading) {
            loadingRow.style.display = 'block';
            downloadButton.disabled = true;
            downloadButton.style.opacity = '0.5';
            textField.disabled = true;
            textField.style.opacity = '0.5';
            pasteButton.disabled = true;
            pasteButton.style.opacity = '0.5';
            errorMessage.textContent = '';
             // Show the circles
             redCircle.style.opacity = 1;
             blackCircle.style.opacity = 1;
        } else {
            loadingRow.style.display = 'none';
            downloadButton.disabled = false;
            downloadButton.style.opacity = '1';
            textField.disabled = false;
            textField.style.opacity = '1';
            pasteButton.disabled = false;
            pasteButton.style.opacity = '1';
            redCircle.style.opacity = 0;
            blackCircle.style.opacity = 0;
            
        }
    }

    function showError(message) {
        errorMessage.textContent = message;
    }

    if (textField) {
        textField.addEventListener('input', function () {
            if (textField.value.trim() !== '') {
                toggleButtonMode(true);
            } else {
                toggleButtonMode(false);
            }
        });
    }

    pasteButton.addEventListener('click', function () {
        if (!isClearMode) {
            if (textField.value === '') {
                if (navigator.clipboard) {
                    navigator.clipboard.readText()
                        .then(text => {
                            textField.value = text;
                            toggleButtonMode(true);
                        })
                        .catch(error => {
                            console.error('Failed to paste:', error);
                            showError('Clipboard read failed.');
                        });
                } else {
                    alert('Clipboard API is not supported in this browser.');
                }
            } else {
                textField.value = '';
                toggleButtonMode(false);
            }
        } else {
            textField.value = '';
            toggleButtonMode(false);
        }
    });

    function toggleButtonMode(clearMode) {
        isClearMode = clearMode;
        const pasteIcon = pasteButton.querySelector('.icon-paste');
        const downloadIcon = downloadButton.querySelector('.fa-download');
        const spanText = pasteButton.querySelector('span');

        if (clearMode) {
            spanText.textContent = 'Clear';
            pasteButton.classList.remove('paste');
            pasteButton.classList.add('clear');
            pasteButton.innerHTML = '<i class="icon icon-clear fas fa-times"></i><span>Clear</span>';
        } else {
            spanText.textContent = 'Paste';
            pasteButton.classList.remove('clear');
            pasteButton.classList.add('paste');
            pasteButton.innerHTML = '<i class="icon icon-paste fas fa-paste"></i><span>Paste</span>';
        }
    }
    downloadButton.addEventListener('click', async function () {
        const tiktokUrl = textField.value;
        if (!tiktokUrl) {
            errorMessage.textContent = 'Please enter a TikTok URL.';
            errorMessage.style.display = 'block';
            return;
        }
    
        setLoadingState(true);
    
        try {
            const response = await fetch(`/check.php?url=${encodeURIComponent(tiktokUrl)}`);
            if (!response.ok) {
                throw new Error(`Backend error: ${response.status}`);
            }
    
            const data = await response.json();
            if (data.isVideo) {
                // Redirect to download page with URL info
                window.location.href = `download.html?url=${encodeURIComponent(tiktokUrl)}`;
            } else {
                errorMessage.textContent = 'Wrong TikTok URL.';
                errorMessage.style.display = 'block';
            }
        } catch (error) {
            errorMessage.textContent = 'An error occurred while checking the TikTok URL.';
            errorMessage.style.display = 'block';
        } finally {
            setLoadingState(false);
    
            // Display the TikTok link info
            const linkInfoDisplay = document.getElementById('link-info-display');
            linkInfoDisplay.innerHTML = `
                <h3>Video Title: ${data.title}</h3>
                <p>Username: ${data.username}</p>
                <img src="${data.avatar}" alt="Avatar" width="50" height="50">
                <p>Download Link: ${tiktokUrl}</p>
            `;
            linkInfoDisplay.style.display = 'block';
        }
    });
    
      
   
}
);


                // SideBars Menu

function showSidebar(){
    const sidebar = document.querySelector('.sidebar')
    sidebar.style.display = 'flex' // open the sideBar
}
function hideSidebar(){
    const hideBar = document.querySelector('.sidebar')
    hideBar.style.display = 'none' // Close The SideBar Or Hide the SideBar
}


         // desciriptions

         document.addEventListener("DOMContentLoaded", function() {
            var resultDiv = document.getElementById("result");
            resultDiv.style.display = "none";
          }
          );
        
          function toggleWords() {
            var resultDiv = document.getElementById("result");
            if (resultDiv.style.display === "none") {
              resultDiv.style.display = "block";
            } else {
              resultDiv.style.display = "none";
            }
          }
          function toggleWords1() {
            var resultDiv = document.getElementById("result1");
            if (resultDiv.style.display === "none") {
              resultDiv.style.display = "block";
            } else {
              resultDiv.style.display = "none";
            }
          }



