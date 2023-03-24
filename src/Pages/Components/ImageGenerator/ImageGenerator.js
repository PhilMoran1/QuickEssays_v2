function ImageGenerator(data, id) {
    console.log("one")
    console.log(data)
  
    const canvas = document.getElementById('myCanvas');
    const context = canvas.getContext('2d');
    console.log("two")
  
    // Set canvas dimensions
    canvas.width = 500;
    canvas.height = 500;
  
    // Create a new DOMParser object
    const parser = new DOMParser();
  
    // Check the data variable
    console.log(data);
  
    // Convert HTML string to DOM document
    const htmlString = "<html><body>" + data + "</body></html>";
  
    const doc = parser.parseFromString(htmlString, 'text/html');
    console.log("INNIT")
  
    // Draw the contents of the DOM document onto the canvas
    const image = new Image();
    image.onload = function() {
      setTimeout(() => {
        console.log("ONLOAD")
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas first
        context.drawImage(image, 0, 0);
  
        // Convert canvas to data URL
        const dataURL = canvas.toDataURL(`images/${id}`);
  
        // Create an img element and set its src attribute to the data URL
        const img = document.createElement('img');
        img.src = dataURL;
  
        // Append the img element to the DOM
        document.body.appendChild(img);
      }, 1000); // Delay execution of onload event by 1 second
    };
  
    // Set the src attribute of the image element to the base64 data URL
    image.src = canvas.toDataURL();
  }
  
export default ImageGenerator;