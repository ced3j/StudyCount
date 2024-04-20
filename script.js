// Derslerin listesi
var lessons = [
    { 
        name: 'Math',
        totalSeconds: 4 * 60 * 60 // 4 saat
    },
    { 
        name: 'E',
        totalSeconds: 4 * 60 * 60 // 4 saat
    },
    {
        name: 'Programming',
        totalSeconds: 5 * 60 * 60
    },
    {
        name: 'Bilişim Etiği',
        totalSeconds: 1 * 60 * 60
    },
    {
        name: 'İSG',
        totalSeconds: 1 * 60 * 60
    }
    // Diğer dersler buraya eklenebilir
];

// Derslerin ana container'ı
var lessonsContainer = document.querySelector('.gridContainer');

// Her ders için HTML içeriğini oluşturma
lessons.forEach(function(lesson) {
    var lessonName = lesson.name.toLowerCase();
    
    // Ders elementini oluştur
    var lessonItem = document.createElement('div');
    lessonItem.id = lessonName + 'Study';
    lessonItem.classList.add('studyItem');

    // Ders başlığı
    var lessonTitle = document.createElement('span');
    lessonTitle.textContent = lesson.name + ': ';
    lessonItem.appendChild(lessonTitle);

    // Ders çalışma süresi
    var lessonTime = document.createElement('span');
    lessonTime.id = lessonName + 'Time';
    lessonTime.classList.add('timePadding');
    lessonTime.textContent = '0:00 / ' + formatTime(lesson.totalSeconds);
    lessonItem.appendChild(lessonTime);

    // Başlat ve durdur butonları
    var startButton = document.createElement('button');
    startButton.textContent = 'Start';
    startButton.id = lessonName + 'Start';
    lessonItem.appendChild(startButton);

    var stopButton = document.createElement('button');
    stopButton.textContent = 'Stop';
    stopButton.id = lessonName + 'Stop';
    lessonItem.appendChild(stopButton);

    var resetButton = document.createElement('button');
    resetButton.textContent = 'Reset';
    resetButton.id = lessonName + 'Reset';
    lessonItem.appendChild(resetButton);

    // Progress bar
    var progressBar = document.createElement('div');
    progressBar.id = lessonName + 'ProgressBar';
    progressBar.classList.add('progressBar');
    lessonItem.appendChild(progressBar);

    // Ders container'ını ana container'a ekle
    lessonsContainer.appendChild(lessonItem);

    // Event listener'lar
    var studyTime = 0;
    var timer;

    startButton.addEventListener('click', function() {
        timer = setInterval(function() {
            studyTime++;
            lessonTime.textContent = formatTime(studyTime) + ' / ' + formatTime(lesson.totalSeconds);
            updateProgressBar(progressBar, studyTime, lesson.totalSeconds);
            localStorage.setItem(lessonName + 'StudyTime', studyTime.toString());
        }, 1000);
    });

    stopButton.addEventListener('click', function() {
        clearInterval(timer);
    });

    resetButton.addEventListener('click', function(){
        studyTime = 0; // Reset study time variable
        lessonTime.textContent = '0:00 / ' + formatTime(lesson.totalSeconds); // Update time display
        updateProgressBar(progressBar, studyTime, lesson.totalSeconds); // Reset progress bar
        localStorage.removeItem(lessonName + 'StudyTime'); // Remove stored time from localStorage
      });
    

    // localStorage'dan ders çalışma süresini al
    var storedTime = parseInt(localStorage.getItem(lessonName + 'StudyTime'));
    if (!isNaN(storedTime)) {
        studyTime = storedTime;
        lessonTime.textContent = formatTime(studyTime) + ' / ' + formatTime(lesson.totalSeconds);
        updateProgressBar(progressBar, studyTime, lesson.totalSeconds);
    }
});

// Function to format time as HH:MM:SS
function formatTime(timeInSeconds) {
    var hours = Math.floor(timeInSeconds / 3600);
    var minutes = Math.floor((timeInSeconds % 3600) / 60);
    var seconds = timeInSeconds % 60;
    return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
}

// Function to pad single digit numbers with leading zeros
function pad(number) {
    return (number < 10 ? '0' : '') + number;
}

// Function to update progress bar
function updateProgressBar(progressBar, studyTime, totalTime) {
    var progress = (studyTime / totalTime) * 100;
    progressBar.style.width = progress + '%';
}
