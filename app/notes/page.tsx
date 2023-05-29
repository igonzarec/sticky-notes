import Link from 'next/link';
import {getPocketBaseInstance} from '@/services/pocketbase';
import styles from './Notes.module.css';
import CreateNote from "@/app/notes/[id]/CreateNote";


async function getNotes() {
    const pb = await getPocketBaseInstance();
    const data = await pb.collection('notes').getList(
    );

    console.log('printing result list!!!');
    console.log(data);

    return data?.items as any[];


}

export default async function NotesPage() {
    const notes = await getNotes();

    return (
        <div style={{display: 'flex', flexDirection: 'column', width: '100%'}}>
            <h1 style={{marginBottom: '20px'}}>Notes</h1>
            <div className={styles.grid}>
                {notes?.map((note) => {
                    return <Note key={note.id} note={note}/>;
                })}
            </div>
            <CreateNote/>
        </div>
    )
}


function Note({note}: any) {
    const {id, title, content, created} = note || {};

    // Set color to light yellow
    const color = '#ffffb3'; // Hex code for light yellow

    return (
        <Link href={`/notes/${id}`}>
            <div className={styles.note} style={{backgroundColor: color}}>
                <h2 style={{color: '#000000'}}>{title}</h2>
                <h5 style={{color: '#000000'}}>{content}</h5>
                <p style={{color: '#000000'}}>{created}</p>
            </div>
        </Link>
    )
}
