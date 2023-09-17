    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');


const lightBufferCanvas = document.createElement('canvas');
const lightBufferCtx = lightBufferCanvas.getContext('2d');

    const width = window.innerWidth;
    const height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const stars = [];
    const numStars = 1500;

    const dustParticles = [];
    const numDustParticles = 500;

    const nebulae = [];
    const numNebulae = 1; 

    const starClusters = [];
    const numStarClusters = 3; // the number of star clusters as needed

    const movingCircles = [];
    const numMovingCircles = 5; // the number of circles as needed


    //clusters
    for (let i = 0; i < numStarClusters; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const clusterSize = Math.random() * 200 + 100; // Random cluster size between 100 and 300
        const numStarsInCluster = Math.floor(Math.random() * 50) + 50; // Random number of stars in the cluster (50 to 100)
        const clusterStars = [];

        for (let j = 0; j < numStarsInCluster; j++) {
            const starX = x + Math.random() * clusterSize - clusterSize / 2;
            const starY = y + Math.random() * clusterSize - clusterSize / 2;
            const radius = Math.random() * 2 + 1;
            const opacity = Math.random() * 0.8 + 0.2;
            clusterStars.push({ x: starX, y: starY, radius, opacity });
        }

        starClusters.push(clusterStars);
    }

    const movingCircle = {
        x: 0,
        y: 0,
        radius: 2, // radius of the circle
        speed: 3,   // speed of the circle
        trailLength: 80, //  length of the fading trail
        trailOpacity: 0.01, // the opacity of the fading trail
        color: 'white', // the color of the circle and trail
    };


    //shootingstars /comets
    function generateMovingCircles() {
        for (let i = 0; i < numMovingCircles; i++) {
            if (Math.random() < 0.002) { // Probability of a circle appearance 
                const newCircle = {
                    x: Math.random() * width,
                    y: Math.random() * height / 2,
                    radius: 1 + Math.random() * 2, 
                    speed: 3 + Math.random() * 2,    
                    trailLength: 100 + Math.random() * 50, // Random trail length between 100 and 150
                    trailOpacity: 0.1, // the opacity of the fading trail
                    color: 'white', // the color of the circle and trail
                };
                movingCircles.push(newCircle);
            }
        }
    }


    function animateMovingCircles() {
        for (let i = 0; i < movingCircles.length; i++) {
            const circle = movingCircles[i];
            if (circle.x < width) {
                // Move the circle across the canvas
                circle.x += circle.speed;

                // Draw the fading trail
                ctx.globalAlpha = circle.trailOpacity;
                ctx.fillStyle = circle.color;
                for (let j = 0; j < circle.trailLength; j++) {
                    const trailX = circle.x - j * (circle.speed / 2);
                    const trailY = circle.y;

                    ctx.beginPath();
                    ctx.arc(trailX, trailY, circle.radius - j * (circle.radius / circle.trailLength), 0, Math.PI * 2);
                    ctx.fill();
                    ctx.closePath();
                }
                ctx.globalAlpha = 1; // Reset global alpha

                // Draw the circle head
                ctx.beginPath();
                ctx.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2);
                ctx.fillStyle = circle.color;
                ctx.fill();
                ctx.closePath();
            } else {
                // If the circle moves beyond the canvas width, remove it from the array
                movingCircles.splice(i, 1);
                i--; // Decrement the index to avoid skipping the next circle due to removal
            }
        }
    }

    // Generate random stars
    for (let i = 0; i < numStars; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const radius = Math.random() * 2 + 1;
        const opacity = Math.random() * 0.8 + 0.2; // Random opacity between 0.2 and 1
        stars.push({ x, y, radius, opacity });
    }

    //Generate dust particles
    for (let i = 0; i < numDustParticles; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const size = Math.random() * 3 + 1; // Random size between 1 and 4
        const opacity = Math.random() * 0.5 + 0.1; // Random opacity between 0.1 and 0.6
        dustParticles.push({ x, y, size, opacity });
    }

    // Generate Nebulaes
    for (let i = 0; i < numNebulae; i++) {
        const centerX = width / 2;
        const centerY = height / 2;
        
        const x = centerX 
        const y = centerY 
        
        const radius = Math.random() * 5000; 
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)'); // White with opacity 0.1 at the center
        gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.5)'); // White with opacity 0.5 at 80% of the radius
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)'); // Transparent white at the outer edge
        nebulae.push({ x, y, radius, gradient });
    }


    function draw() {


        // Draw a black background
        ctx.fillStyle = 'black';
        ctx.fillRect(0, 0, width, height);
        
        // Draw stars with twinkle effect
        ctx.fillStyle = 'white';
        for (const star of stars) {
            if (Math.random() < 0.005) { // Randomly change opacity for the twinkle effect
                star.opacity = Math.random() * 0.8 + 0.2;
            }
            ctx.globalAlpha = star.opacity; // Apply the opacity
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        
        // Draw smaller twinkle stars with a lower opacity
        ctx.fillStyle = 'white';
        for (let i = 0; i < numStars; i++) {
            if (Math.random() < 0.005) {
                ctx.globalAlpha = Math.random() * 0.5 + 0.1;
                const x = Math.random() * width;
                const y = Math.random() * height;
                ctx.fillRect(x, y, 1, 1);
            }
        }

        // atmospheric haze 
        ctx.fillStyle = 'white';
        for (const star of stars) {
            // Calculate the distance of each star from the center of the canvas
            const distanceFromCenter = Math.sqrt((star.x - width / 2) ** 2 + (star.y - height / 2) ** 2);
            
            // Define a maximum distance (beyond which the haze is not applied)
            const maxDistance = Math.min(width, height) * 0.7; // 
            
            // Calculate the haze opacity based on the distance from the center
            const hazeOpacity = Math.max(0, 1 - distanceFromCenter / maxDistance);
    
            // Apply the haze effect
            ctx.globalAlpha = hazeOpacity;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
        }
        //dust
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)'; // the color as needed
        for (const particle of dustParticles) {
            ctx.globalAlpha = particle.opacity;
            ctx.fillRect(particle.x, particle.y, particle.size, particle.size);
        }



        //nebalue
        for (const nebula of nebulae) {
            ctx.globalCompositeOperation = 'lighter'; // Blending mode for colorful effect
            ctx.fillStyle = nebula.gradient;
            ctx.beginPath();
            ctx.arc(nebula.x, nebula.y, nebula.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.globalCompositeOperation = 'source-over'; // Reset blending mode
        }

        // Draw star clusters
        ctx.fillStyle = 'white'; // the color of the star clusters
        for (const clusterStars of starClusters) {
            for (const star of clusterStars) {
                ctx.globalAlpha = star.opacity;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            }
        }


        generateMovingCircles();
        animateMovingCircles();




        requestAnimationFrame(draw);
    }

    draw();
