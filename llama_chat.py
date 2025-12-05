# from llama_cpp import Llama
# import sys, json

# # Load your local llama model
# llm = Llama(model_path="models/llama-2-7b-chat.ggmlv3.q4_0.bin")  # path to your converted weights

# def get_reply(prompt):
#     result = llm(prompt, max_tokens=300)
#     print(json.dumps({"reply": result['choices'][0]['text']}))

# if __name__ == "__main__":
#     data = json.loads(sys.argv[1])
#     get_reply(data["prompt"])

# from llama_cpp import Llama
# import sys
# import json
# import os

# try:
    
#     llm = Llama(model_path=model_path, verbose=False)
#     # Read JSON from stdin
#     json_input = sys.stdin.read()
#     data = json.loads(json_input)
#     prompt = data["prompt"]

#     result = llm(prompt, max_tokens=300)


#     reply_text = result['choices'][0]['text']

#     print(json.dumps({"reply": reply_text}))

# except Exception as e:

#     error_message = f"An error occurred: {e}"
#     print(json.dumps({"reply": f"⚠️ AI failed to generate a response. Details: {error_message}"}), file=sys.stdout)
#     print(error_message, file=sys.stderr)
#     sys.exit(1)
from llama_cpp import Llama
import sys
import json
import os

try:
    # Read JSON from stdin first, as this is the primary input
    json_input = sys.stdin.read()
    data = json.loads(json_input)
    prompt = data["prompt"]

    # Define the model path inside the try block
    model_path = os.path.join(os.path.dirname(__file__), "models", "llama-2-7b-chat.ggmlv3.q4_0.bin")
    
    # Load the model
    llm = Llama(model_path=model_path, verbose=False)

    # Generate a response
    result = llm(prompt, max_tokens=300)
    
    # Extract the response text
    reply_text = result['choices'][0]['text']

    # Print the final JSON response to stdout
    print(json.dumps({"reply": reply_text}))

except FileNotFoundError:
    error_message = f"Model file not found at path: {model_path}"
    print(json.dumps({"reply": f"⚠️ AI failed to generate a response. Details: {error_message}"}), file=sys.stdout)
    print(error_message, file=sys.stderr)
    sys.exit(1)
except json.JSONDecodeError:
    error_message = "Invalid JSON input received from Node.js."
    print(json.dumps({"reply": f"⚠️ AI failed to generate a response. Details: {error_message}"}), file=sys.stdout)
    print(error_message, file=sys.stderr)
    sys.exit(1)
except Exception as e:
    # A more generic catch-all for other issues
    error_message = f"An unexpected error occurred: {e}"
    print(json.dumps({"reply": f"⚠️ AI failed to generate a response. Details: {error_message}"}), file=sys.stdout)
    print(error_message, file=sys.stderr)
    sys.exit(1)