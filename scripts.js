document.addEventListener('DOMContentLoaded', function() {
    const gameLinks = document.querySelectorAll('.game a');
    let selectedGameIndex = 0; 

    function updateSelection(index) {
        gameLinks.forEach(link => link.parentNode.classList.remove('selected'));
        gameLinks[index].parentNode.classList.add('selected');
        selectedGameIndex = index;
    }

    // Initial selection update
    updateSelection(selectedGameIndex);

    // Listen for keydown events
    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowRight':
                // Move selection to the right
                if (selectedGameIndex < gameLinks.length - 1) {
                    updateSelection(selectedGameIndex + 1);
                }
                break;
            case 'ArrowLeft':
                // Move selection to the left
                if (selectedGameIndex > 0) {
                    updateSelection(selectedGameIndex - 1);
                }
                break;
            case 'Enter':
                // Open the selected game
                gameLinks[selectedGameIndex].click();
                break;
        }
    });
});
