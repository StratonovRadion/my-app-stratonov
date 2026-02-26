'use client';

type ErrorProps = {
    reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
    return (
        <div>
            <h2>Произошла ошибка</h2>
            <button onClick={reset}>Повторить</button>
        </div>
    );
}