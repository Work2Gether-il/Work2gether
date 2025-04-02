export default async function salle({
    params,
}: {
  params: Promise<{ token: string }>
}){
    const {token} = await params;
    return(
        <h1>{token}</h1>
    );
}