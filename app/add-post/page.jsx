'use client'
import { useState } from "react";
import styles from "../page.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const router = useRouter()

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const handleContentChange = (e) => {
        setContent(e.target.value);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            await fetch('/api/add-post', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({title, content})
            })
            router.refresh()
        } catch(error) {
            console.error(error);
        }

        setTitle('');
        setContent('');
    }

    return (
        <main className={styles.main}>
            <Link href={'/'}>View Feed</Link>
            <h1>Add Post</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input type="text" value={title} onChange={handleTitleChange} required />
                </div>
                <div style={{marginTop: '0.5rem'}}>
                    <label htmlFor="content">Content:</label>
                    <input type="text" value={content} onChange={handleContentChange} required />
                </div>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}