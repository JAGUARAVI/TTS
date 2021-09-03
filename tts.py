import pyttsx3
engine = pyttsx3.init()
print("READY")
inp = input()
file = input()
engine.save_to_file(inp, file)
engine.runAndWait()
print("DONE")