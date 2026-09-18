# Production-scale architecture diagram

`architecture.mmd` is Mermaid source. Paste it into https://mermaid.live and export as PNG or PDF for the submission ZIP.

## Diagram summary
- Static React frontend served through a CDN/edge cache.
- API gateway/load balancer routes traffic to stateless Spring Boot service replicas.
- Separate listing, search, booking/availability, and identity domains.
- PostgreSQL as transactional source of truth, read replicas for read-heavy traffic.
- Redis for hot listing/cache data; OpenSearch/Elasticsearch for search.
- Object storage for photos, delivered via CDN.
- Queue-based background notifications and event processing.
- Centralized logs, metrics, traces, and alerting.

This is a high-level proposed production architecture, not implemented infrastructure.
