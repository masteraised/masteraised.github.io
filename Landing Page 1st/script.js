document.addEventListener('DOMContentLoaded', function() {
    var darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-mode');
        var headers = document.querySelectorAll('header');
        headers.forEach(function(header) {
            header.classList.toggle('dark-mode');
        });
    });
});
