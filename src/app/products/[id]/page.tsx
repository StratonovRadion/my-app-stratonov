import type {Metadata, ResolvingMetadata} from 'next'

type Props = {
    params: Promise<{id: string}>
}

export async function generateMetadata(
    {params}: Props,
    parent: ResolvingMetadata
):Promise<Metadata>{
    const { id } = await params
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res)=>res.json())

    return{
        title: post.title,
        description: post.body,
    }
}

export default async function DynamicPage({ params }: { params: Promise<{id: string}> }) {
    const { id } = await params;

    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res)=>res.json())
    return (
        <main>
            <h1>Динамический маршрут</h1>
            <p>Значение параметра: {id}</p>
            <p>User Id: {post.userId}</p>
            <p>id: {post.id}</p>
            <p>title: {post.title}</p>
            <p>body: {post.body}</p>
        </main>
    );
}