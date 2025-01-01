import { App, StableDiffusionPipeline } from "modal";

// Create the app instance
const app = new App(); // Ensure you instantiate the App correctly

// Define the function that will generate the image
async function generateImage(prompt: string): Promise<string> {
  const pipeline = await StableDiffusionPipeline.from_pretrained(
    "CompVis/stable-diffusion-v1-4"
  );
  pipeline.to("cuda"); // Move model to GPU if available

  // Generate the image based on the prompt
  const result = await pipeline.generate(prompt);
  return result.images[0].toDataURL(); // Return image in Data URL format
}

// Register the function with the app
app.function(generateImage, { gpu: true });

// Export the app instance
export default app;
