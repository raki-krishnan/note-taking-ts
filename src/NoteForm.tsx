import { useRef, useState, type FormEvent } from "react";
import { Col, Form, Row, Stack, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import CreatableReactSelect from "react-select/creatable";
import { type NoteData, type Tag } from "./App";


type NoteFormProps = {
    onSubmit: (data: NoteData) => void
}

export function NoteForm( {onSubmit} : NoteFormProps) {
    const titleRef = useRef<HTMLInputElement>(null);
    const markdownRef = useRef<HTMLTextAreaElement>(null);
    const [selectedTags, setSelectedTags] = useState<Tag[]>([])

    function handleSubmit(e: FormEvent): void {
        e.preventDefault();
        if (titleRef.current === null || markdownRef.current === null) {
            return;
        }
        onSubmit({
            title: titleRef.current!.value,
            markdown: markdownRef.current!.value,
            tags: []
        })
    }
    return (
        <Form onSubmit = {handleSubmit}>
            <Stack gap = {4}>
                <Row>
                    <Col>
                        <Form.Group controlId = "title">
                            <Form.Label>Title</Form.Label>
                            <Form.Control ref = {titleRef} required placeholder = "Title" />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId = "tags">
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect value={selectedTags.map(tag => {
                                    return { label: tag.label, value: tag.id }
                                })} 
                                onChange = {tags => {
                                    setSelectedTags(tags.map(tag => {
                                        return { label: tag.label, id: tag.value }
                                    }))
                                }}
                                isMulti 
                            />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId = "markdown">
                    <Form.Label>Body</Form.Label>
                    <Form.Control ref={markdownRef} required as = "textarea" rows = {15} placeholder = "Write your note here..." />
                </Form.Group>

                <Stack direction = "horizontal" gap = {2} className = "justify-content-end">
                    <Button type = "submit" variant = "primary">Save</Button>
                    <Link to = ".."> {/* This is a relative path to go back to the previous page */}
                        <Button type = "button" variant = "outline-secondary">Cancel</Button>
                    </Link>
                </Stack>

            </Stack>
        </Form>
    )
}