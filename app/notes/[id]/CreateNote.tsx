'use client';

import {useState} from 'react';
import {getPocketBaseInstance} from "@/services/pocketbase";
import {useRouter} from 'next/navigation';

export default function CreateNote() {

    const router = useRouter();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('')

    const create = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // prevent the form from submitting normally
        console.log('enters function');
        const pb = await getPocketBaseInstance();

        const data = {
            "title": title,
            "content": content
        };

        console.log(data);
        const record = await pb.collection('notes').create(JSON.stringify(data));
        console.log("THIS HAAPENS");
        console.log(record);

        setContent('');
        setTitle('');
        document.location.reload()


        /*
        Chat GPT:
        You have the useRouter hook imported from Next.js but aren't using it in the given code.
        If you're planning on redirecting the user after creating a note, you might want to consider
        using router.push("/some-path") instead of document.location.reload().
         */

    }

    console.log('thishsifhsifd')

    return (
        <form onSubmit={create} style={{display: 'flex', flexDirection: 'column', margin: "20px", maxWidth: '100%'}}>
            <h3>Create a new Note</h3>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '100%'
                }}
            />
            <textarea
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '10px',
                    minHeight: '200px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                    width: '100%'
                }}
            />
            <button type="submit" style={{
                padding: '10px',
                backgroundColor: '#007BFF',
                color: '#fff',
                borderRadius: '5px',
                border: 'none',
                cursor: 'pointer',
                width: '100%'
            }}>
                Create note
            </button>
        </form>
    );


}