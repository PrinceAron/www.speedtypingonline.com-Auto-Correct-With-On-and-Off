// Perfect Auto-Typing Script for SpeedTypingOnline (100% Accuracy, Max WPM)
// MODIFIED VERSION 2.0:
// - The 'Alt' key now functions as a toggle switch.
// - Press 'Alt' to turn auto-correction OFF.
// - Press 'Alt' again to turn auto-correction ON.
// - Auto-correction is ON by default.
(function() {
    // State variable to track if the auto-corrector is active
    let isAutoCorrectActive = true; // Start with the feature ON

    var input = document.querySelector('#blockDivContainer');
    if (!input) {
        console.error('Input area (#blockDivContainer) not found! Ensure the page is loaded.');
        return;
    }
    input.focus();

    console.log('TOGGLE auto-corrector active! Feature is currently ON.');
    console.log("Press the 'Alt' key to toggle it OFF/ON.");

    function getExpectedChar() {
        var nxtSpan = document.querySelector('#blockDivContainer .nxtLetter');
        if (!nxtSpan) return null;
        var expected = nxtSpan.textContent.trim();
        if (expected === '' && nxtSpan.innerHTML === '&nbsp;') {
            expected = ' ';
        }
        return expected;
    }

    function simulateTypeChar(char) {
        if (!char || char === '') return;

        var charCode = char.charCodeAt(0);
        var commonEventProps = {
            key: char,
            code: char === ' ' ? 'Space' : 'Key' + char.toUpperCase(),
            keyCode: charCode,
            which: charCode,
            bubbles: true,
            cancelable: true
        };

        input.dispatchEvent(new KeyboardEvent('keydown', commonEventProps));
        input.dispatchEvent(new KeyboardEvent('keypress', commonEventProps));
        input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
        input.dispatchEvent(new KeyboardEvent('keyup', commonEventProps));
    }

    input.addEventListener('keydown', function(event) {
        // *** MODIFICATION START ***
        // Check if the toggle key ('Alt') was pressed
        if (event.key === 'Alt') {
            event.preventDefault(); // Prevent default browser action (like focusing the menu)
            isAutoCorrectActive = !isAutoCorrectActive; // Flip the state
            console.log(`Auto-correction is now ${isAutoCorrectActive ? 'ON' : 'OFF'}.`);
            return; // Stop further processing for the Alt key itself
        }

        // If auto-correction is turned off, do nothing and allow normal typing
        if (!isAutoCorrectActive) {
            return;
        }
        // *** MODIFICATION END ***

        // Ignore other non-printable/control keys
        if (event.key.length > 1) {
            return;
        }

        var expectedChar = getExpectedChar();
        if (!expectedChar) return;

        // If the pressed key is already correct, let it pass through
        if (event.key === expectedChar) {
            return;
        }

        // Otherwise, block the wrong key
        event.preventDefault();
        event.stopPropagation();
        event.stopImmediatePropagation();

        // And simulate the correct one
        simulateTypeChar(expectedChar);

    }, true); // Use capture phase

})();
