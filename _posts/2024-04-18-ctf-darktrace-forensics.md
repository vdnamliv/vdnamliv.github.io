---
title: "SeaGame CTF - Forensics: Darktrace"
date: 2024-04-18
categories:
  - ctf
tags:
  - forensics
  - pcap
event: "SeaGame CTF 2024"
excerpt: "Parsing a 1 GB PCAP, rebuilding DNS tunneling C2, and decrypting the AES payload."
---
## Timeline

| Time | Event |
| --- | --- |
| 09:00 | Received the PCAP |
| 09:45 | Spotted `greenleaf.htb` |
| 10:20 | Finished the DNS decoder |

## DNS tunnel

Payload format: `BASE32(timestamp || chunk || hmac)`. Rebuild with `scapy`:

```python
for pkt in rdpcap("darktrace.pcap"):
    if pkt.haslayer(DNSQR):
        label = pkt[DNSQR].qname.decode().split(".")[0]
        chunk = base64.b32decode(label.upper())
        stream.write(chunk)
```

## Decryption

The first request carries the AES key while the HMAC protects integrity. After stitching the archive we extract a binary and the flag.

## Takeaways

- The C2 flow lasts 14 minutes, enough to add a rule for sub-domains longer than 50 characters.
- Log `TXT` queries as well because the adversary can pivot channels quickly.
