import { get } from 'http'
import type {Metadata, ResolvingMetadata} from 'next'
import {cache} from 'react'

type Props = {
    params: Promise<{id: string}>
}

export const getPost = cache(async (id: string)=> {
    const post = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res)=>res.json())

    return post
})

export async function generateMetadata(
    {params}: Props,
    parent: ResolvingMetadata
):Promise<Metadata>{
    const { id } = await params
    const post = await getPost(id)

    return{
        title: post.title,
        description: post.body,
    }
}

export default async function DynamicPage({ params }: { params: Promise<{id: string}> }) {
    const { id } = await params;

    const post = await getPost(id)
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