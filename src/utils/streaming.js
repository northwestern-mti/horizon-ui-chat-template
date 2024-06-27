/*
 * Send a request to the given resource and stream the results to the given callback.
 * Returns a promise that resolves when the full response has been streamed.
 *
 * Adapted from https://medium.com/@bs903944/event-streaming-made-easy-with-event-stream-and-javascript-fetch-8d07754a4bed
 */
export function streamResponse(resource, options, callback) {

  // Return as a Promise that resolves after the full response has been streamed
  return new Promise((resolve, reject) => {

    // Fetch the given resource and start reading
    fetch(resource, options)
      .then(response => {
        const reader = response.body.getReader()

        // Recursive function that reads one chunk at a time and passes it to the callback
        // Resolves the Promise and stops the recursion when the stream ends
        const readChunk = () => {
          reader.read()
            .then(({ value, done }) => {

              // If stream has finished, invoke the callback one last time and resolve the Promise
              if (done) {
                if (value) callback(value);
                resolve();
                return;
              }

              // Otherwise, decode the value to a string and pass each line to the callback
              // If multiple lines are generated and returned in quick succession, they may be chunked together
              const chunkString = new TextDecoder().decode(value);
              for (let line of chunkString.split('\n')) {
                if (line) callback(line);
              }

              // Recurse
              readChunk();
            })

            // On reader error, reject the Promise
            .catch((error) => {
              reject(error);
            })
        }

        // Read the first chunk
        readChunk();
      })

      // On fetch error, reject the Promise
      .catch((error) => {
        reject(error);
      })
  })
}


/*
 * Send a user message to the given resource and stream the AI response to the given callback.
 * Returns a promise that resolves when the full response has been streamed.
 */
export function streamAIMessage(resource, message, options, callback) {

  // Package user message into a POST request body
  const full_options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message }),

    // Combine any other options 
    ...options,
  };

  // Stream the response
  return streamResponse(resource, full_options, (value) => {
    if (value === null) return;
    callback(JSON.parse(value));
  });
}


export default {
  streamResponse,
  streamAIMessage,
}
