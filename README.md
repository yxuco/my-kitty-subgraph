# Simple subgraph to collect Pregnant CryptoKitties

Build subgraph:

```bash
cd ../my-kitty-subgraph
yarn
yarn codegen
yarn build
```

Build graph-node if not already done so:

```bash
cd ..
git clone https://github.com/graphprotocol/graph-node
cd graph-node
rustup update
rustup -V
cargo update
cargo build
```

Setup postgreSQL database for graph-node:

```bash
export PATH=$PATH:/Library/PostgreSQL/13/bin
createdb -U postgres graph-node
psql -U postgres graph-node
  create extension pg_trgm;
  create extension pg_stat_statements;
  create extension btree_gist;
  create extension postgres_fdw;
  grant usage on foreign data wrapper postgres_fdw to postgres;
  \q
```

Start local graph-node:

```
cd ../graph-node
cargo run -p graph-node --release -- \
  --postgres-url postgresql://postgres:postgres@localhost:5432/graph-node \
  --ethereum-rpc mainnet:https://mainnet.infura.io/v3/<infura-project-id> \
  --ipfs https://ipfs.infura.io:5001
```

Install graph-cli for subgraph management commands:

```bash
npm install -g @graphprotocol/graph-cli
```

Deploy subgraph after the local graph-node has started:

```bash
cd ../my-kitty-subgraph
yarn create-local
yarn deploy-local
```

Cleanup previously registered subgraph:

```bash
graph remove <subgraph-name> --node http://127.0.0.1:8020
```

