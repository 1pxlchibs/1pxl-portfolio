let mouseX = 0;
let mouseY = 0;

window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;

    console.log(mouseX, mouseY);
});

document.addEventListener('DOMContentLoaded', function() {
    const stage = document.getElementById('stage');
    if (!stage) {
        console.error('Stage element #stage not found for ASCII spiral.');
        return;
    }

    // Force the stage to be fully visible
    stage.style.opacity = '0.4';
    
    // Adjust cols/rows based on viewport and desired density
    const cols = Math.floor(window.innerWidth / 5); // Reduced divisor for more columns (full width)
    const rows = Math.floor(window.innerHeight / parseFloat(getComputedStyle(stage).fontSize)); 
    
    const glyphs = ".,-=+-*#%)&";  // 10 chars from "empty" to "full"

    // Centered text for the logo
    const logoText = [
  " ██╗██████╗ ██╗  ██╗██╗      ██████╗██╗  ██╗██╗██████╗ ███████╗",
  "███║██╔══██╗╚██╗██╔╝██║     ██╔════╝██║  ██║██║██╔══██╗██╔════╝",
  "╚██║██████╔╝ ╚███╔╝ ██║     ██║     ███████║██║██████╔╝███████╗",
  " ██║██╔═══╝  ██╔██╗ ██║     ██║     ██╔══██║██║██╔══██╗╚════██║",
  " ██║██║     ██╔╝ ██╗███████╗╚██████╗██║  ██║██║██████╔╝███████║",
  " ╚═╝╚═╝     ╚═╝  ╚═╝╚══════╝ ╚═════╝╚═╝  ╚═╝╚═╝╚═════╝ ╚══════╝"
  ];
    
    // Create scrambled versions of the logo for animation
    const scrambleChars = "▁▂▃▄▅▆▇█▉▊▋▌▍▎▏▐░▒▓▔▕▖▗▘▙▚▛▜▝▞▟■□▢▣▤▥▦▧▨▩▪▫▬▭▮▯";
    const logoTextScrambled = [];
    
    // Generate multiple scrambled versions (more scrambled to less scrambled)
    // Increased to 18 steps for smoother animation
    for (let scrambleLevel = 17; scrambleLevel >= 0; scrambleLevel--) {
        const currentScramble = [];
        
        for (let i = 0; i < logoText.length; i++) {
            let newRow = "";
            for (let j = 0; j < logoText[i].length; j++) {
                const originalChar = logoText[i][j];
                if (originalChar === " ") {
                    newRow += " "; // Keep spaces as spaces
                } else {
                    // Higher scramble levels have more randomness
                    const randomFactor = scrambleLevel / 17; // 1.0 to 0.0 (adjusted for 18 steps)
                    
                    if (Math.random() < randomFactor) {
                        // Choose a random character from our scramble chars
                        newRow += scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                    } else {
                        // Keep the original character
                        newRow += originalChar;
                    }
                }
            }
            currentScramble.push(newRow);
        }
        logoTextScrambled.push(currentScramble);
    }
    
    // Add the final form (original logo text) as the last entry
    logoTextScrambled.push(logoText);

    // Pre-calculate logo dimensions and offsets for centering
    const logoHeight = logoText.length;
    const logoWidth = logoText[0].length; // Assumes all logo lines have same length
    const logoStartRow = Math.floor(rows / 2 - logoHeight / 2);
    const logoStartCol = Math.floor(cols / 2 - logoWidth / 2);

    let animationFrameId = null;
    
    // Adapted animation function
    function frame(time) {
        // Increase the time scaling factor for faster animation
        const e = time * 0.0009; // Increased for faster animation
        const r = e * .005;
        const out = [];
        const k = glyphs.length / 2; // Midpoint of glyphs for bipolar calculation
        
        // Phase for logo reveal
        const revealPhase = Math.PI / 2.5;
        
        // Variables for unscrambling animation
        const unscrambleDuration = 1.0; // 1 second unscramble
        const unscrambleStartTime = revealPhase + 0.1; // Start soon after reveal
        const unscrambleEndTime = unscrambleStartTime + unscrambleDuration;
        
        // Calculate which scrambled version to use based on time
        let currentLogoVersion = logoText; // Default to the original
        
        if (e > unscrambleStartTime && e < unscrambleEndTime) {
            // During unscramble animation
            const progress = (e - unscrambleStartTime) / unscrambleDuration;
            const scrambleIndex = Math.min(
                logoTextScrambled.length - 1,
                Math.floor(progress * logoTextScrambled.length)
            );
            currentLogoVersion = logoTextScrambled[scrambleIndex];
        } else if (e >= unscrambleEndTime) {
            // After unscramble is complete
            currentLogoVersion = logoText;
        }

        for (let y = 0; y < rows; y++) {
            let rowString = "";
            const Y = y / rows * 2 - 1; // -1 to 1

            for (let x = 0; x < cols; x++) {
                const X = x / cols * 2 - 1; // -1 to 1

                const l = Math.hypot(X, Y); // r or radius
                let a = Math.atan2(Y, X);   // angle

                let char_idx = 0;
                let ch = glyphs[0];
                
                let min = 0.1;
                let max = 1.0;
                let time = performance.now() / 2000;
                let value = min + (Math.sin(time) + 1) * 0.5 * (max - min);

                if (l < 1.5) { // Only draw if within unit circle (approx)
                    a += e; // Rotate angle by time
                    a += l * Math.PI; // Add spiral based on radius
                    
                    
                    // This part creates the swirl pattern
                    char_idx = Math.floor(
                        (Math.cos(l * 2 + e * 2) + Math.sin(a * 2 - l * 3 + r * 3)) / 2 * k + k
                    );
                    
                    char_idx = Math.max(0, Math.min(glyphs.length - 1, char_idx)); // Clamp index
                    ch = glyphs[char_idx];

                    
                }

                // Logo reveal logic
                const logorow_idx = y - logoStartRow;
                const logocol_idx = x - logoStartCol;

                if (e > revealPhase &&
                    logorow_idx >= 0 && logorow_idx < logoHeight &&
                    logocol_idx >= 0 && logocol_idx < logoWidth &&
                    currentLogoVersion[logorow_idx][logocol_idx] !== undefined &&
                    currentLogoVersion[logorow_idx][logocol_idx] !== " ") {

                    // Threshold-based transition to avoid character interpolation issues
                    const pct = Math.min(1, (e - revealPhase) / 0.2); // Fast transition
                    
                    if (pct > 0.5) {
                        // Once we're past 50% of the transition, show the logo character
                        const logoChar = currentLogoVersion[logorow_idx][logocol_idx];
                        
                        // After unscramble is complete, add white color and glow
                        if (e >= unscrambleEndTime) {
                            ch = `<span >${logoChar}</span>`;
                        } else {
                            // During unscramble, just show without special styling
                            ch = logoChar;
                        }
                    } else {
                        // Before that, show brightened spiral character
                        const idx = Math.min(glyphs.length - 1, char_idx + Math.floor(pct * 10));
                        ch = glyphs[idx];
                    }
                }
                rowString += ch;
            }
            out.push(rowString);
        }

        // Use innerHTML to render the output with spans for white logo characters
        stage.innerHTML = out.map(row => `<pre>${row}</pre>`).join('');
        animationFrameId = requestAnimationFrame(frame);
    }

    // Handle window resizing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (animationFrameId) {
                cancelAnimationFrame(animationFrameId);
            }
            
            // Recalculate dimensions based on new window size
            const newCols = Math.floor(window.innerWidth / 5); 
            const newRows = Math.floor(window.innerHeight / parseFloat(getComputedStyle(stage).fontSize));
            
            // Update logo positioning
            const newLogoStartRow = Math.floor(newRows / 2 - logoHeight / 2);
            const newLogoStartCol = Math.floor(newCols / 2 - logoWidth / 2);
            
            // Create a new animation function with updated dimensions
            function updateFrame(time) {
                // Same animation logic with updated dimensions
                const e = time * 0.0009 + 0.8;
                const out = [];
                const k = glyphs.length / 2;
                const revealPhase = Math.PI / 2.5;
                
                const unscrambleDuration = 1.0;
                const unscrambleStartTime = revealPhase + 0.1;
                const unscrambleEndTime = unscrambleStartTime + unscrambleDuration;
                
                let currentLogoVersion = logoText;
                
                if (e > unscrambleStartTime && e < unscrambleEndTime) {
                    const progress = (e - unscrambleStartTime) / unscrambleDuration;
                    const scrambleIndex = Math.min(
                        logoTextScrambled.length - 1,
                        Math.floor(progress * logoTextScrambled.length)
                    );
                    currentLogoVersion = logoTextScrambled[scrambleIndex];
                } else if (e >= unscrambleEndTime) {
                    currentLogoVersion = logoText;
                }

                for (let y = 0; y < newRows; y++) {
                    let rowString = "";
                    const Y = y / newRows * 2 - 1;

                    for (let x = 0; x < newCols; x++) {
                        const X = x / newCols * 2 - 1;
                        const l = Math.hypot(X, Y);
                        let a = Math.atan2(Y, X);
                        let char_idx = 0;
                        let ch = glyphs[0];
                        
                        let min = 0.1;
                        let max = 1.0;
                        let time = performance.now() / 2000;
                        let value = min + (Math.sin(time) + 1) * 0.5 * (max - min);

                        if (l < 1.5) {
                            a += e;
                            a += l * Math.PI;
                            char_idx = Math.floor(
                                (Math.cos(a * 3 + l * 2 + e * 2) + Math.sin(a * 2 - l * 3 + e * 3)) / 2 * k + k
                            );
                            char_idx = Math.max(0, Math.min(glyphs.length - 1, char_idx));
                            ch = glyphs[char_idx];
                        }

                        const logorow_idx = y - newLogoStartRow;
                        const logocol_idx = x - newLogoStartCol;

                        if (e > revealPhase &&
                            logorow_idx >= 0 && logorow_idx < logoHeight &&
                            logocol_idx >= 0 && logocol_idx < logoWidth &&
                            currentLogoVersion[logorow_idx][logocol_idx] !== undefined &&
                            currentLogoVersion[logorow_idx][logocol_idx] !== " ") {

                            const pct = Math.min(1, (e - revealPhase) / 0.2);
                            
                            if (pct > 0.5) {
                                const logoChar = currentLogoVersion[logorow_idx][logocol_idx];
                                
                                if (e >= unscrambleEndTime) {
                                    ch = `<span class="breathing">${logoChar}</span>`;
                                } else {
                                    ch = logoChar;
                                }
                            } else {
                                const idx = Math.min(glyphs.length - 1, char_idx + Math.floor(pct * 10));
                                ch = glyphs[idx];
                            }
                        }
                        rowString += ch;
                    }
                    out.push(rowString);
                }

                stage.innerHTML = out.map(row => `<pre>${row}</pre>`).join('');
                animationFrameId = requestAnimationFrame(updateFrame);
            }

            console.log("Resized. Animation restarted with new dimensions.");
            requestAnimationFrame(updateFrame);
        }, 250); // Debounce resize event
    });

    // Start the animation
    requestAnimationFrame(frame);
});