"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { fetchNoteById } from "@/lib/api";
import css from "./NoteDetails.module.css";

interface NoteDetailsProps {
  id: string;
}

const NoteDetails = ({ id }: NoteDetailsProps) => {
  const {
    data: note,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["note", id],
    queryFn: () => fetchNoteById(id),
  });

  if (isLoading) {
    return <p>Loading note...</p>;
  }

  if (isError || !note) {
    return <p>Something went wrong. Failed to load note.</p>;
  }

  return (
    <main className={css.main}>
      <div className={css.container}>
        <Link href="/notes" className={css.backLink}>
          ← Back to notes
        </Link>

        <div className={css.note}>
          <h1 className={css.title}>{note.title}</h1>

          <p className={css.content}>{note.content}</p>

          <span className={css.tag}>{note.tag}</span>

          <p className={css.date}>
            Created: {new Date(note.createdAt).toLocaleString()}
          </p>
        </div>
      </div>
    </main>
  );
};

export default NoteDetails;
