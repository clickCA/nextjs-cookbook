"use client";
import React, { useState } from "react";
// Atoms
interface ButtonProps {
    children: React.ReactNode;
    variant?: "default" | "primary" | "success" | "danger";
    onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
    children,
    variant = "default",
    onClick,
}) => {
    const variants = {
        default: "px-4 py-2 rounded",
        primary: "px-4 py-2 rounded bg-blue-400 text-white hover:bg-blue-500",
        success: "px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600",
        danger: "px-4 py-2 rounded bg-red-400 text-white hover:bg-red-500",
    };

    return (
        <button className={variants[variant]} onClick={onClick}>
            {children}
        </button>
    );
};

interface TextProps {
    children: React.ReactNode;
    variant?: "title" | "subtitle" | "body" | "date";
}

const Text: React.FC<TextProps> = ({ children, variant = "body" }) => {
    const variants = {
        title: "text-2xl font-bold text-gray-800",
        subtitle: "text-xl text-gray-700",
        body: "text-gray-600",
        date: "text-sm text-gray-500",
    };

    return <p className={variants[variant]}>{children}</p>;
};

import Link from "next/link";

// Molecules
interface ArticleCardProps {
    title: string;
    description: string;
    date: string;
    onEdit: () => void;
    onDelete: () => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({
    title,
    description,
    date,
    onEdit,
    onDelete,
}) => {
    return (
        <div className="border-b py-4">
            <div className="flex justify-between items-start">
                <div>
                    <Text variant="subtitle">{title}</Text>
                    <Text>{description}</Text>
                    <Text variant="date">{date}</Text>
                </div>
                <div className="flex gap-2">
                    <Button variant="success" onClick={onEdit}>
                        edit
                    </Button>
                    <Button variant="danger" onClick={onDelete}>
                        delete
                    </Button>
                </div>
            </div>
        </div>
    );
};

const Header = () => {
    return (
        <header className="bg-slate-600 text-white p-6">
            <Text variant="title">NextJS. Cookbook</Text>
        </header>
    );
};

const Navigation = () => {
    return (
        <nav className="flex gap-6 p-4 border-b">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
            </Link>
            <Link
                href="/articles"
                className="text-gray-600 hover:text-gray-900"
            >
                Articles
            </Link>
            <Link href="/about" className="text-gray-600 hover:text-gray-900">
                About
            </Link>
        </nav>
    );
};

// Organisms
interface Article {
    id: number;
    title: string;
    description: string;
    date: string;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

interface ArticlesListProps {
    articles: Article[];
}

const ArticlesList: React.FC<ArticlesListProps> = ({ articles }) => {
    return (
        <div className="p-4">
            <div className="flex justify-between items-center mb-6">
                <Text variant="title">Articles list</Text>
                <Button variant="primary">+ add article</Button>
            </div>
            <div className="space-y-4">
                {articles.map((article) => (
                    <ArticleCard
                        key={article.id}
                        title={article.title}
                        description={article.description}
                        date={article.date}
                        onEdit={() => article.onEdit(article.id)}
                        onDelete={() => article.onDelete(article.id)}
                    />
                ))}
            </div>
        </div>
    );
};

// Template
import { ReactNode } from "react";

const Layout: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <Navigation />
            <main className="container mx-auto">{children}</main>
            <footer className="text-center py-4 text-gray-600">
                2024. All rights reserved
            </footer>
        </div>
    );
};

// Modal Template
interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-xl w-96">
                <div className="flex justify-between items-center mb-4">
                    <Text variant="title">Article Form</Text>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
};
// Page Example
const ArticlesPage = () => {
    // State for articles
    const [articles, setArticles] = useState([
        {
            id: 1,
            title: "test title",
            description: "test description",
            date: "11.11.2022",
        },
        {
            id: 2,
            title: "new test title",
            description: "new test description",
            date: "12.11.2022",
        },
    ]);

    // State for modal
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<null | {
        id: number;
        title: string;
        description: string;
    }>(null);

    // Handle article creation
    const handleAddArticle = (title: string, description: string) => {
        const newArticle = {
            id: articles.length + 1,
            title,
            description,
            date: new Date().toLocaleDateString(),
        };
        setArticles([...articles, newArticle]);
        setIsModalOpen(false);
    };

    // Handle article editing
    const handleEdit = (id: number) => {
        const article = articles.find((a) => a.id === id);
        if (article) {
            setEditingArticle(article);
            setIsModalOpen(true);
        }
    };

    // Handle article update
    const handleUpdate = (id: number, title: string, description: string) => {
        setArticles(
            articles.map((article) =>
                article.id === id ? { ...article, title, description } : article
            )
        );
        setIsModalOpen(false);
        setEditingArticle(null);
    };

    // Handle article deletion
    const handleDelete = (id: number) => {
        setArticles(articles.filter((article) => article.id !== id));
    };

    const articlesWithHandlers = articles.map((article) => ({
        ...article,
        onEdit: () => handleEdit(article.id),
        onDelete: () => handleDelete(article.id),
    }));

    return (
        <Layout>
            <ArticlesList articles={articlesWithHandlers} />
            {/* Add Modal component here for create/edit form */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Title
                        </label>
                        <input
                            type="text"
                            className="w-full p-2 border rounded"
                            value={editingArticle?.title || ""}
                            onChange={(e) =>
                                setEditingArticle((prev) =>
                                    prev
                                        ? { ...prev, title: e.target.value }
                                        : null
                                )
                            }
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 mb-2">
                            Description
                        </label>
                        <textarea
                            className="w-full p-2 border rounded"
                            value={editingArticle?.description || ""}
                            onChange={(e) =>
                                setEditingArticle((prev) =>
                                    prev
                                        ? {
                                              ...prev,
                                              description: e.target.value,
                                          }
                                        : null
                                )
                            }
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button
                            variant="danger"
                            onClick={() => setIsModalOpen(false)}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="success"
                            onClick={() => {
                                if (editingArticle) {
                                    handleUpdate(
                                        editingArticle.id,
                                        editingArticle.title,
                                        editingArticle.description
                                    );
                                } else {
                                    handleAddArticle(
                                        editingArticle?.title || "",
                                        editingArticle?.description || ""
                                    );
                                }
                            }}
                        >
                            {editingArticle ? "Update" : "Create"}
                        </Button>
                    </div>
                </form>
            </Modal>
        </Layout>
    );
};

export default ArticlesPage;
