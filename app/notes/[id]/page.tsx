import {getPocketBaseInstance} from '@/services/pocketbase';
import styles from './NotePage.module.css';
import CreateNote from "@/app/notes/[id]/CreateNote";


async function getNote(noteId: string) {
    console.log('getting note!!!');
    const pb = await getPocketBaseInstance();

    const record = await pb.collection('notes').getOne(noteId);

    console.log(record);
    return await record;
}

export default async function NotePage({params}: any) {

    const note = await getNote(params.id);

    return (
        <div className={styles.container} style={{ backgroundColor: '#ffffb3' }}>
            <h1>Note</h1>
            <h3 style={{ color: '#000000' }}>{note.title}</h3>
            <h5 style={{ color: '#000000' }}>{note.content}</h5>
            <p style={{ color: '#000000' }}>{note.created}</p>
        </div>

    )
}