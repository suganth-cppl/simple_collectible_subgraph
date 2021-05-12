# Simple Collectible Subgraph

## Prerequisites

To build and run this project you need to have the following installed on your system:

1. Rust (latest stable) – How to install Rust
2. PostgreSQL – PostgreSQL Downloads
3. IPFS – Installing IPFS

### Step 1

First you need to run the graph node in your machine for deploying the subgraph.

` git clone https://github.com/graphprotocol/graph-node.git ` 

clone the above repository for graph node source

#### Running a Local Graph Node
1. Install IPFS and run `ipfs init` followed by `ipfs daemon`.
2. Install PostgreSQL and run `initdb -D .postgres` followed by `pg_ctl -D .postgres -l logfile start` and `createdb graph_node`.

> NOTE: If facing some issue in postgres, go ahead and create database named as `graph_node` and proceed. 
> Use the below command for creating database in postgres
> * `sudo -u postgres psql`
> * `create database graph_node;`
> * `create user postgres with encrypted password 'postgres';`
> * `grant all privileges on database graph_node to postgres;`
> * `alter role postgres createrole SuperUser;`

3. If using Ubuntu, you may need to install additional packages:
    * `sudo apt-get install -y clang libpq-dev libssl-dev pkg-config`

Once you have all the dependencies set up, you can run the following:

```
cargo run -p graph-node --release --  --postgres-url postgresql://postgres:postgres@localhost:5432/graph_node  --ethereum-rpc rinkeby:https://rinkeby.infura.io/v3/[infura_project_id]  --ipfs 127.0.0.1:5001
```

> NOTE:
> ##### infura_project_id
> for `infura_project_id` you need to have account in `infura.io`, then create a project and choose the network `rinkeby`
> 
> This is the syntax for cargo url
> ```
> cargo run -p graph-node --release -- \
>  --postgres-url postgresql://USERNAME[:PASSWORD]@localhost:5432/graph_node \
>  --ethereum-rpc [URL] \
>  --ipfs 127.0.0.1:5001
> ```
> 
> #### Common Mistakes
> * do not use single/double quotes in the rpc url 
> * make sure the database name is same in the connection string given in the cargo command
> * make sure the IPFS and Postgres are running before starting the graph node

 
### Step 2

Second you need to run the subgraph 

clone this repository using the below command

`git clone https://github.com/suganth-cppl/simplecollectible_subgraph.git`

and use the following commands

1. `yarn codegen` // for generating the subgraph codes according to the graph schema
2. `yarn create-local` // for creating the subgraph in the graph node
3. `yarn deploy-local` // for deploying the subgraph in the graph node 

#### HELP NOTES

##### subgraph.yaml
  * this is the configuration file for the subgraph 
  * you can `startBlock: [Block_Number]` below the `source`, so the the subgraph will look for events from the given start block
  * you can see the mappings, abis and event handlers for the subgraph

##### schema.graphql
  * this is the graphql file for schema and table fields
  * you can set the relations and all other graphql configurations

##### src/mapping.ts
  * this is the file for writing the event handlers which is already represented in the .yaml file
  * it is used to capture the event emitted from the respective block chain
  * here the mappings can be done based on the schema representation
  * event will bring the params and it will mapped with the schema fields 

##### after deployment of subgraph
  * it will provide two graphql urls, one is `http` and other is `ws` (web socket)
  * both are used for graphql queries which can be used in the dapps
  * use this url for graphql online explorer `https://lucasconstantino.github.io/graphiql-online/`
  * change the endpoint with `http` url
  * with the help of documentation explorer in the graphql explorer, you can see the types and fields which is to be queried 
  * use the below sample query for getting the transfer events
  ```
     query {
      transferEntities{
      id
      count
      history {
         id
         from
         to
         tokenId
      }
      }
   }
```
