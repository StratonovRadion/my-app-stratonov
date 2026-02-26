interface Params {
    id: string;
}

export default async function DynamicPage({ params }: { params: Params }) {
    const { id } = await params;
    return (
        <main>
            <h1>Динамический маршрут</h1>
            <p>Значение параметра: {id}</p>
        </main>
    );
}