let currentImageIndex = 0;
let currentSong;
let clearTextSeconds = 3;
let songs = {
philharmonic: null,
mark: null,
shuzin: null
};
let lastWaveform = [];
let lastVolume = 0;
currentTitle = 0;
const margin = 200
let titles = {
  0: {
    name: "מסכנים שכאלה",
    description: "תמונה ראשונה ובה יש המון המון המון טקסטטטט",
    files: [
      {
        filePath:"images/poor/poor.mp4"
      }, 
      {
        filePath:"images/poor/poor1.png"
      }, 
      {
        filePath:"images/poor/poor2.webp"
      }, 
      {
        filePath:"images/poor/poor3.jpg"
      }, 
      {
        filePath:"images/poor/poor5.jpg"
      }, 
      {
        filePath:"images/poor/poor6.webp"
      },  
    ]
  },
  1: {
    name: "המסע המופלא",
    description: "זה הסרטון הכי הכיזה הסרטון הכיהסרטון הכי הכיזה הסרטון הכי הכי",
    files: [
      {
        filePath:"images/spirited/spirited.mp4"
      }, 
      {
        filePath:"images/spirited/spirited(1).jpg"
      }, 
      {
        filePath:"images/spirited/spirited(1).png"
      }, 
      {
        filePath:"images/spirited/spirited(1).webp"
      }, 
      {
        filePath:"images/spirited/spirited(2).jpg"
      }, 
      {
        filePath:"images/spirited/spirited(2).webp"
      }, 
      {
        filePath:"images/spirited/spirited(3).jpg"
      }, 
      {
        filePath:"images/spirited/spirited(3).webp"
      }, 
    ]
  },
  2: {
    name: "מלון גרנד בודפשט",
    description: "תמונה ראשונה ובה יש המון המון המון טקסטטטט",
    files: [
      {
        filePath:"images/budapest/buda.mp4"
      }, 
      {
        filePath:"images/budapest/buda1.gif"
      }, 
      {
        filePath:"images/budapest/buda2.jpg"
      }, 
      {
        filePath:"images/budapest/buda3.webp"
      }, 
      {
        filePath:"images/budapest/buda4.jpg"
      }, 
      {
        filePath:"images/budapest/buda5.webp"
      }, 
      {
        filePath:"images/budapest/buda6.jpg"
      }, 
      {
        filePath:"images/budapest/buda7.webp"
      }, 
    ]
  },
  3: {
    name: "צורת המים",
    description: "תמונה ראשונה ובה יש המון המון המון טקסטטטט",
    files: [
      {
        filePath:"images/water/water.mp4"
      }, 
      {
        filePath:"images/water/water(1).jpg"
      }, 
      {
        filePath:"images/water/water(1).png"
      }, 
      {
        filePath:"images/water/water(2).jpg"
      }, 
      {
        filePath:"images/water/water(2).png"
      }, 
      {
        filePath:"images/water/water(3).jpg"
      }, 
    ]
  },
  4: {
    name: "אומנים",
    description: "תמונה ראשונה ובה יש המון המון המון טקסטטטט",
    files: [
      {
        filePath:"images/mark/mark.mp4"
      }, 
      {
        filePath:"images/mark/mark(1).webp"
      }, 
      {
        filePath:"images/shuzin/shuzin(2).jpg"
      }, 
      {
        filePath:"images/phil/phil(2).jpg"
      }, 
      {
        filePath:"images/chan/chan(3).jpg"
      }, 
      {
        filePath:"images/mizkaka/mizkaka(3).jpg"
      }, 
      {
        filePath:"images/ymka/ymka1.png"
      }, 
      {
        filePath:"images/ymka/ymka2.png"
      }, 
      {
        filePath:"images/ymka/ymka3.png"
      }
    ]
  },
  5: {
    name: "אודות",
    description: "תמונה ראשונה ובה יש המון המון המון טקסטטטט",
    files: [
      {
        filePath:"images/odot/odot_pic1.png"
      }, 
      {
        filePath:"images/odot/odot_pic2.png"
      }, 
      {
        filePath:"images/odot/odot_pic3.png"
      }, 
      {
        filePath:"images/odot/odot_pic4.png"
      }, 
      {
        filePath:"images/odot/odot_pic5.png"
      }, 
      {
        filePath:"images/odot/odot_pic6.png"
      }, 
      {
        filePath:"images/odot/odot_pic7.png"
      }, 
    ]
  }
  
}

let soundVolume = 0.5;
let canvas;
let volumeSlider;
let currentlyPlaying = '';
let fft;

function fontByMusic() {
  if (currentSong && currentSong.isPlaying()) {
    if (currentlyPlaying === 'shuzin') {
      return "Soda FOT";
    } else if (currentlyPlaying === 'mark') {
      return "Mugrabi";
    } else if (currentlyPlaying === 'philharmonic') {
      return "Hadassah";
    }
  }
  return "Narkiss Block";
}

function showMusicText() {
  if (currentTitle === 5) {
    return;
  }
  const songNameDiv = document.getElementById('songNameDiv');
  const plusDiv = document.getElementById('plusDiv');
  const imageDiv = document.getElementById('videoNameDiv');
  if (currentSong && currentSong.isPlaying()) {
    const buttonText = document.getElementById(currentlyPlaying).innerHTML;
    songNameDiv.innerHTML = buttonText;
    songNameDiv.style.fontFamily = fontByMusic();
    plusDiv.innerHTML = "+";
    const newText = titles[currentTitle].name;
    imageDiv.innerHTML = newText;

    // after 3 seconds clear the text:
    setTimeout(() => {
      songNameDiv.innerHTML = "";
      plusDiv.innerHTML = "";
      imageDiv.innerHTML = "";
    }, clearTextSeconds * 1000);
  } else {
    songNameDiv.innerHTML = "";
    plusDiv.innerHTML = "";
    imageDiv.innerHTML = "";
  }
}

function initializeCircles() {
    const circlesContainer = document.querySelector('.circles-container');
    circlesContainer.innerHTML = '';
    files = titles[currentTitle].files;
    for (let i = 0; i < files.length; i++) {
        const circleSVG = `
            <svg class="circle-nav ${i === currentImageIndex ? 'active' : ''}" 
                width="20" height="17" viewBox="0 -2 20 20">
                <circle cx="8.5" cy="8.5" r="6" stroke="black" stroke-width="6" fill="none"/>
                <circle cx="8.5" cy="8.5" r="6" stroke="white" stroke-width="5" fill="none"/>
            </svg>
        `;
        circlesContainer.innerHTML += circleSVG;
    }
}

function updateCircles() {
    const circles = document.querySelectorAll('.circle-nav');
    circles.forEach((circle, index) => {
        if (index === currentImageIndex) {
            circle.classList.add('active');
        } else {
            circle.classList.remove('active');
        }
    });
}

function showOdot() {
  document.getElementById('odot').style.display = 'flex';
}

function hideOdot() {
  document.getElementById('odot').style.display = 'none';
}

function changeTitle(title) {
  currentTitle = title;
  if (!titles[currentTitle]) {
    currentTitle = 0;
  }
  currentImageIndex = 0;
  initializeCircles();
  changeDescriptionText();
  changeTitleButtonStyle();
  showPopup(true)
  if (currentTitle === 5) {
    showOdot();
  } else {
    hideOdot();
  }
}

function loadVideo(files, index) {
    const vid = createVideo(files[index].filePath);
    vid.volume(0);
    vid.hide();
    vid.loop();
    files[index].real = vid;
}

function loadSimpleImage(files, index) {
    const img = loadImage(files[index].filePath);
    files[index].real = img;
}

function loadFile(files, index) {
    if (files[index].filePath.includes(".mp4")) {
        loadVideo(files, index);
    } else {
        loadSimpleImage(files,index);
    }
}

function preload() {
// get all video files names in the videos folder
Object.values(titles).forEach((title) => {
  title.files.forEach((file, i) => {
      loadFile(title.files, i);
  });
});
soundFormats('mp3');
songs["shuzin"] = loadSound("sound/Shuzin.mp3");
songs["mark"] = loadSound("sound/Mark Eliyahu.mp3");
songs["philharmonic"] = loadSound("sound/philharmonic.mp3");
}


function setup() {
    // Create canvas that fills the container
    frameRate(30);
    const w = window.innerWidth;
    const h = window.innerHeight - margin;
    
    canvas = createCanvas(w, h);
    canvas.parent('canvas-container');

    fft = new p5.FFT(0.8, 1024);  

    volumeSlider = select('#volume');
    initializeCircles();
}        
  
function nextImage() {
    files = titles[currentTitle].files;
    currentImageIndex = Math.abs((currentImageIndex - 1 + files.length)) % files.length;
    updateCircles();
  }
  
  function previousImage() {
    files = titles[currentTitle].files;
    currentImageIndex = Math.abs((currentImageIndex + 1)) % files.length;
    updateCircles();
  }

  function getFileToDisplay() {
    files = titles[currentTitle].files;
    file = files[currentImageIndex];
    if (file.filePath.includes(".mp4")) {
        return file.real;
    } else {
        return file.real;
    }
  }

  function isFileVideo() {
    files = titles[currentTitle].files;
    file = files[currentImageIndex];
    if (file.filePath.includes(".mp4")) {
        return true;
    } else {
        return false;
    }
  }

  function draw() {
    background(255);
    
    let img = getFileToDisplay();

    // Calculate new dimensions to ensure coverage while maintaining aspect ratio
    let aspectRatio = img.width / img.height;
    let screenAspectRatio = width / (height); // Accounting for the 160px offset
    let newWidth, newHeight;
    
    if (screenAspectRatio > aspectRatio) {
        // If screen is wider than image, fit to width
        newWidth = width;
        newHeight = width / aspectRatio;
    } else {
        // If screen is taller than image, fit to height
        newHeight = height;
        newWidth = (height) * aspectRatio;
    }  
    newWidth = width;
    newHeight = height;
    let imageX = (width - newWidth) / 2;
    let imageY = (height - newHeight ) / 2;
      
    // ניתוח הספקטרום של המוזיקה
    let spectrum = fft.analyze();
    let bassEnergy = fft.getEnergy("bass");
    let midEnergy = fft.getEnergy("mid");
    let trebleEnergy = fft.getEnergy("treble");
    
    if (isFileVideo()) {   
      image(img, imageX, imageY, newWidth, newHeight);
    } else if ( !currentSong || !currentSong.isPlaying()) { 
      image(img, imageX, imageY, newWidth, newHeight);
    }
    else if (currentlyPlaying === 'shuzin') {
      drawShuzinEffect(img, imageX, imageY, newWidth, newHeight, bassEnergy, midEnergy, trebleEnergy);
    } else if (currentlyPlaying === 'mark') {
      drawMarkEffect(img, imageX, imageY, newWidth, newHeight, bassEnergy, midEnergy, trebleEnergy);
    } else if (currentlyPlaying === 'philharmonic') {
      drawPhilharmonicEffect(img, imageX, imageY, newWidth, newHeight, bassEnergy, midEnergy, trebleEnergy);
    }
  
    drawWaveform();
    soundVolume = volumeSlider.value();
    if (currentSong) {
      currentSong.setVolume(soundVolume);
    }
  }
  
  
  function drawShuzinEffect(img, imageX, imageY, newWidth, newHeight, bassEnergy, midEnergy, trebleEnergy) {
    let drumEnergy = fft.getEnergy(100, 200);
    
    // הגברת האפקט של הבאסים והתופים
    let bassInfluence = pow(bassEnergy / 255, 2) * 40;
    let drumInfluence = pow(drumEnergy / 255, 2) * 30;
    
    // גודל פיקסלים משתנה לפי בס ותופים
    let pixelSize = map(bassInfluence + drumInfluence, 0, 70, 5, 40);
    
    // תזוזה גלית מוגברת בהתאם לתדרים אמצעיים
    let waveOffset = map(midEnergy, 0, 255, 0, 50);
    
    // שינוי בהירות דינמי
    let brightnessShift = map(trebleEnergy, 0, 255, -30, 70);
    
    push();
    translate(imageX, imageY);
    
    // צייר את התמונה בפיקסלים
    for (let x = 0; x < newWidth; x += pixelSize) {
      for (let y = 0; y < newHeight; y += pixelSize) {
        // חישוב תזוזה גלית
        let xOffset = sin(frameCount * 0.05 + y * 0.1) * waveOffset;
        let yOffset = cos(frameCount * 0.05 + x * 0.1) * waveOffset;
        
        // הוספת רעש אקראי קטן
        xOffset += random(-2, 2);
        yOffset += random(-2, 2);
        
        // חישוב מיקום הפיקסל
        let sourceX = map(x, 0, newWidth, 0, img.width);
        let sourceY = map(y, 0, newHeight, 0, img.height);
        
        // קבלת צבע מהתמונה המקורית
        let col = img.get(sourceX, sourceY);
        
        // שינוי בהירות הצבע
        let r = red(col) + brightnessShift;
        let g = green(col) + brightnessShift;
        let b = blue(col) + brightnessShift;
        
        fill(r, g, b);
        noStroke();
        rect(x + xOffset, y + yOffset, pixelSize, pixelSize);
      }
    }
    pop();
  }
  
  function drawMarkEffect(img, imageX, imageY, newWidth, newHeight, bassEnergy, midEnergy, trebleEnergy) {
    push();
    translate(imageX, imageY);
    
    // First draw the original image with slight transparency
    tint(255, 150);
    image(img, 0, 0, newWidth, newHeight);
    noTint();
    
    // Load pixels for manipulation
    loadPixels();
    img.loadPixels();
    
    // Wave parameters - slightly reduced for subtler effect
    let waveAmplitude = map(bassEnergy, 0, 255, 5, 20);       // Reduced wave height
    let waveFrequency = map(midEnergy, 0, 255, 0.02, 0.05);   // Wave frequency
    let waveSpeed = frameCount * 0.05;                         // Wave movement speed
    
    // Parameters based on audio
    let pixelSize = floor(map(bassEnergy, 0, 255, 3, 8));     // Slightly smaller rhombuses
    
    // Process image in blocks
    for (let y = 0; y < newHeight; y += pixelSize) {
      for (let x = 0; x < newWidth; x += pixelSize) {
        // Create multiple wave patterns
        let wave1 = sin(x * waveFrequency + waveSpeed) * waveAmplitude;
        let wave2 = sin(y * waveFrequency + waveSpeed * 0.5) * (waveAmplitude * 0.5);
        let wave3 = cos((x + y) * waveFrequency * 0.5 + waveSpeed * 0.7) * (waveAmplitude * 0.3);
        
        // Combine waves with reduced intensity
        let yOffset = (wave1 + wave2 + wave3) * 0.7;
        let xOffset = (wave2 + wave3) * 0.7;
        
        // Add high frequency movement (reduced)
        let highFreqMove = map(trebleEnergy, 0, 255, 0, 10) * sin(frameCount * 0.2);
        xOffset += highFreqMove;
        
        // Get color from original image with better position tracking
        let sourceX = constrain(x + floor(xOffset/2), 0, img.width - 1);
        let sourceY = constrain(y + floor(yOffset/2), 0, img.height - 1);
        let index = (sourceY * img.width + sourceX) * 4;
        
        // Get RGB values
        let r = img.pixels[index];
        let g = img.pixels[index + 1];
        let b = img.pixels[index + 2];
        
        // Size variation based on waves (reduced variation)
        let sizeVar = map(sin(x * 0.01 + waveSpeed), -1, 1, 0.9, 1.1);
        let currentSize = pixelSize * sizeVar;
        
        // Higher base opacity for better image visibility
        let baseAlpha = 220;
        let waveHeight = abs(yOffset) / waveAmplitude;
        let alpha = map(waveHeight, 0, 1, baseAlpha, 180);
        
        // Draw rhombus-shaped pixel
        fill(r, g, b, alpha);
        noStroke();
        
        // Draw rhombus with wave movement
        beginShape();
        // Top point
        vertex(x + currentSize/2 + xOffset, y + yOffset);
        // Right point
        vertex(x + currentSize + xOffset, y + currentSize/2 + yOffset);
        // Bottom point
        vertex(x + currentSize/2 + xOffset, y + currentSize + yOffset);
        // Left point
        vertex(x + xOffset, y + currentSize/2 + yOffset);
        endShape(CLOSE);
      }
    }
    
    // Subtler glow effect
    if (trebleEnergy > 100) {
      drawingContext.shadowBlur = map(sin(frameCount * 0.1), -1, 1, 3, 10);
      drawingContext.shadowColor = color(255, map(trebleEnergy, 100, 255, 10, 30));
    }
    
    pop();
  }
  // הוספת משתנה גלובלי בתחילת הקוד
  let smears = [];  // מערך לשמירת המריחות
  
  function drawPhilharmonicEffect(img, imageX, imageY, newWidth, newHeight, bassEnergy, midEnergy, trebleEnergy) {
    push();
    translate(imageX, imageY);
    
    // ניתוח תדרים של כינורות
    let violinSpectrum = fft.analyze();
    let violinEnergy = 0;
    for(let i = 50; i < 150; i++) {
      violinEnergy += violinSpectrum[i];
    }
    violinEnergy = violinEnergy / 100;
    
    // צייר את התמונה המקורית
    image(img, 0, 0, newWidth, newHeight);
    loadPixels();
    
    // מספר הפיקסלים שנזיז בכל פעם
    let moveAmount = map(violinEnergy, 0, 255, 0, 50);
    
    // עבור על כל שורה בתמונה
    for(let y = 0; y < newHeight; y += 2) {
      // חשב את כמות התזוזה לשורה זו
      let rowOffset = sin(frameCount * 0.1 + y * 0.03) * moveAmount;
      
      // עבור על כל פיקסל בשורה
      for(let x = 0; x < newWidth; x++) {
        let sourceX = x;
        let sourceY = y;
        
        // חשב את המיקום החדש של הפיקסל
        let destX = x + rowOffset * noise(x * 0.01, y * 0.01, frameCount * 0.02);
        destX = constrain(destX, 0, newWidth - 1);
        
        // העתק את הפיקסל למיקום החדש
        let sourceIndex = (sourceY * width + sourceX) * 4;
        let destIndex = (y * width + Math.floor(destX)) * 4;
        
        // העתק את ערכי הצבע
        pixels[destIndex] = pixels[sourceIndex];        // R
        pixels[destIndex + 1] = pixels[sourceIndex + 1];  // G
        pixels[destIndex + 2] = pixels[sourceIndex + 2];  // B
        pixels[destIndex + 3] = pixels[sourceIndex + 3];  // A
      }
    }
    
    updatePixels();
    
    // הוסף אפקט זוהר כשיש צלילים חזקים
    if(violinEnergy > 150) {
      drawingContext.shadowBlur = map(violinEnergy, 150, 255, 5, 20);
      drawingContext.shadowColor = color(255, 255, 255, 100);
    }
    
    pop();
  }

function changeButtonStyle(type) {
  document.querySelectorAll('.buttons button').forEach(btn => {
      btn.classList.remove('philharmonic-active', 'mark-active', 'shuzin-active');
    });
    document.getElementById('philharmonic').classList.add('philharmonic');
    document.getElementById('mark').classList.add('mark');
    document.getElementById('shuzin').classList.add('shuzin');


  switch(type) {
    case 'philharmonic':
        document.getElementById('philharmonic').classList.add('philharmonic-active');
        document.getElementById('philharmonic').classList.remove('philharmonic');
        break;
    case 'mark':
        document.getElementById('mark').classList.add('mark-active');
        document.getElementById('mark').classList.remove('mark');

        break;
    case 'shuzin':
        document.getElementById('shuzin').classList.add('shuzin-active');
        document.getElementById('shuzin').classList.remove('shuzin');
        break;
  }
}

function changeTitleButtonStyle() {
    const clickedTitleId = `title${currentTitle}`;
    const clickedButton = document.getElementById(clickedTitleId);
    
    // Reset style of previously active button (if any)
    const previousActive = document.querySelector('.title-active');
    if (previousActive) {
      previousActive.classList.remove('title-active');
    }
    
    // Add active class to current button
    clickedButton.classList.add('title-active');
}


function toggleMusic(type) {
  changeButtonStyle(type);
  showPopup(true);
  if (currentSong && currentSong.isPlaying()) {
    currentSong.stop();
    if (currentlyPlaying === type) {
      currentlyPlaying = '';
      showMusicText();
      return;
    }
  }
  
  if (songs[type]) {
    currentSong = songs[type];
    currentSong.setVolume(soundVolume);
    currentSong.play();
    currentlyPlaying = type;
    fft.setInput(currentSong);
  }
  showMusicText();
}

  
  let waveformFrame = 0;
  let frozenWaveformFrame = 0;
  // Add this function to your existing p5.js code
  function drawWaveform() {
    // Get waveform data from p5.FFT
    fft.analyze();
    let waveform = fft.waveform();
    let volume = 0;
    let spectrum = fft.analyze();
    let bass = fft.getEnergy("bass") / 100;
    let treble = fft.getEnergy("treble")/ 100;

    for(let i = 0; i < spectrum.length; i++) {
        volume += spectrum[i];
    }
    volume = volume / spectrum.length; // Average volume
    noiseScale = 100 * soundVolume;
    if (currentSong && currentSong.isPlaying()) {
      lastWaveform = [...waveform];
      lastVolume = volume;
      frozenWaveformFrame = waveformFrame;
      waveformFrame = frameCount; // Use actual frameCount for animation
    } else {
      waveform = lastWaveform;
      volume = lastVolume
      waveformFrame = frozenWaveformFrame;
    }

    let baseAmplitude = 40;
    // Make amplitude responsive to volume
    // between 0 to 200% of baseAmplitude
    totalVol = volume + (soundVolume * 10)
    let amplitude = baseAmplitude * totalVol / 20;
  
    push();
    fill(255);  // White fill
    noStroke();
    
    beginShape();
    // Start at bottom left corner
    footerHeight = document.getElementById('footer').offsetHeight;
    waveHeight = window.innerHeight - margin;
    vertex(0, waveHeight);

    // Calculate width of each segment
    let sliceWidth = width / waveform.length;

    // Draw the top of the wave
    for (let i = 0; i < waveform.length; i++) {
      let x = i * sliceWidth;
      let y = map(waveform[i], 1, -1, waveHeight, waveHeight);
      // Add some smoothing using noise
      y -= noise(i * 0.1 + waveformFrame * 0.05, bass, treble) * amplitude;
      vertex(x, y);
    }
    
    // Complete the shape by going to bottom right corner
    vertex(width, waveHeight);
    endShape(CLOSE);
    
    // Draw top wave
    beginShape();
    // Start at top left corner
    vertex(0, 0);
    
    // Draw the bottom of the wave (inverted)
    for (let i = 0; i < waveform.length; i++) {
      let x = i * sliceWidth;
      // Adjust the mapping to make the wave more prominent, but inverted for top
      let y = map(waveform[i], -1, 1, 0, 0);
      // Add some smoothing using noise (using different offset for variation)
      y += noise(i * 0.1 + waveformFrame * 0.05, bass, treble) * amplitude;
      vertex(x, y);
    }
    
    // Complete the shape by going to top right corner
    vertex(width, 0);
    endShape(CLOSE);
    pop();
  
  }

function getPopupBackground() {
  // pop up background decided by combination of the current song and the current title.
  let path = 'popup/';
  if (currentTitle === 0) {
    path += "Poor_Things+";
  } else if (currentTitle === 1) {
      path += "Spirited_Away+";
  } else if (currentTitle === 2) {
      path += "The_Grand_Budapest_Hotel+";
  } else if (currentTitle === 3) {
      path += "The_Shape_of_Water+";
  }

  if (!currentlyPlaying) {
    path += "mark";
  }
  path += currentlyPlaying
  path += "_pop.png";
  return path;
}

function changePopupText(isArtist) {
  let imagePath = "popup/"
  if (isArtist) {
    document.getElementById('change-popup').style.display = 'flex';
    document.getElementById('change-popup2').style.display = 'none';
    if (currentlyPlaying){
      imagePath += currentlyPlaying;
    } else {
      imagePath += "mark";
    }
  } else {
    document.getElementById('change-popup').style.display = 'none';
    document.getElementById('change-popup2').style.display = 'flex';
    switch(currentlyPlaying) {
      case 'shuzin':
        imagePath += "mizkaka";
        break;
      case 'mark':
        imagePath += "hachan";
        break;
      case 'philharmonic':
        imagePath += "imka";
        break;
      default:
        imagePath += "hachan";
    }
  }
  
  imagePath += "_pop.png";
  document.getElementById('popup-background').style.backgroundImage = `url(${imagePath})`;
}

function changeDescriptionText() {
  let newText = "לתקציר הסרט ופרטי המופע"
  if (currentTitle === 4) {
    newText = "למידע על האמן/ים ועל המתחם"
  }
  document.getElementById('description').innerHTML = newText;
}



function showPopup(check) {
  if (check && document.getElementById('popup').style.display == "none") {
    return
  }
  imagePath = getPopupBackground();
  document.getElementById('popup-background').style.backgroundImage = `url(${imagePath})`;;
  document.getElementById('popup').style.display = 'block';
  document.getElementById('description-container').style.visibility = 'hidden';

  if (currentTitle === 4) {
    document.getElementById('change-popup').style.display = 'flex';
  } else {
    document.getElementById('change-popup').style.display = 'none';
    document.getElementById('change-popup2').style.display = 'none';
  }
}

function hidePopup() {
  document.getElementById('popup').style.display = 'none';
  document.getElementById('description-container').style.visibility = 'visible';
}
