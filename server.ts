import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const handler = async (request: Request): Promise<Response> => {
  const url = new URL(request.url);
  let filePath = url.pathname;

  
  if (filePath === "/") {
    filePath = "/pages/index.html";
  }

  try {
    
    const file = await Deno.readFile(`.${filePath}`);
    
    // Determine content type based on file extension
    const contentType = filePath.endsWith(".css") 
      ? "text/css" 
      : filePath.endsWith(".js") 
        ? "application/javascript" 
        : "text/html";

    return new Response(file, {
      headers: {
        "content-type": contentType,
      },
    });
  } catch (error) {
   
    return new Response("Not Found", { status: 404 });
  }
};

console.log("Server running at http://localhost:8000");
await serve(handler, { port: 8000 }); 