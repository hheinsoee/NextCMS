import React from 'react';
import { promises as fs } from 'fs';
import { MarkDownView } from "./../(admin)/admin/_private/components/Inputs";

async function page(props) {
    const text = await fs.readFile(process.cwd() + '/src/markdown/doc.md', 'utf8');
    return (
        <div>
            <MarkDownView text={text} />
        </div>
    );
}

export default page;