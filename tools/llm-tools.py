import requests
import argparse

args = argparse.ArgumentParser()
args.add_argument("--p", type=str)
args = args.parse_args()

url = "http://127.0.0.1:11434/api/chat"
model = "qwen2:0.5b"
headers = {"Content-Type": "application/json"}
data = {
        "model": model,
        "options": {
            "temperature": 0.0
         },
        "stream": False,
        "messages": [{
            "role": "system",
            "content": args.p
        }]
    }

response=requests.post(url,json=data,headers=headers,timeout=60)
res=response.json()
print(res)