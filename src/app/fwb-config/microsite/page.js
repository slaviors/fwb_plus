'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

export default function MicrositePage() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [microsite, setMicrosite] = useState({
        links: [],
        socialMedia: {
            website: '',
            whatsapp: '',
            instagram: '',
            facebook: '',
            twitter: ''
        }
    });
    const [newLink, setNewLink] = useState({ title: '', url: '' });
    const router = useRouter();

    const STATIC_TITLE = 'FWB+';
    const STATIC_ICON = '🔗';

    const socialIcons = {
        website: '🌐',
        whatsapp: '📱',
        instagram: '📷',
        facebook: '👥',
        twitter: '🐦'
    };

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const response = await fetch('/api/auth/me');
            if (response.ok) {
                const data = await response.json();
                setUser(data.user);
                fetchMicrosite();
            } else {
                router.push('/login');
            }
        } catch (error) {
            console.error('Auth check failed:', error);
            router.push('/login');
        } finally {
            setLoading(false);
        }
    };

    const fetchMicrosite = async () => {
        try {
            const response = await fetch('/api/fwb-config/microsite');
            if (response.ok) {
                const data = await response.json();
                if (data.microsite) {
                    setMicrosite(data.microsite);
                }
            }
        } catch (error) {
            console.error('Error fetching microsite:', error);
        }
    };

    const generateLinkId = () => {
        return 'link_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    };

    const addLink = () => {
        if (newLink.title && newLink.url) {
            const link = {
                id: generateLinkId(),
                title: newLink.title,
                url: newLink.url,
                order: microsite.links.length
            };

            setMicrosite({
                ...microsite,
                links: [...microsite.links, link]
            });

            setNewLink({ title: '', url: '' });
        }
    };

    const removeLink = (linkId) => {
        setMicrosite({
            ...microsite,
            links: microsite.links.filter(link => link.id !== linkId)
        });
    };

    const updateLink = (linkId, field, value) => {
        setMicrosite({
            ...microsite,
            links: microsite.links.map(link =>
                link.id === linkId ? { ...link, [field]: value } : link
            )
        });
    };

    const updateSocialMedia = (platform, url) => {
        setMicrosite({
            ...microsite,
            socialMedia: {
                ...microsite.socialMedia,
                [platform]: url
            }
        });
    };

    const onDragEnd = (result) => {
        if (!result.destination) return;

        const items = Array.from(microsite.links);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        const updatedItems = items.map((item, index) => ({
            ...item,
            order: index
        }));

        setMicrosite({
            ...microsite,
            links: updatedItems
        });
    };

    const saveMicrosite = async () => {
        setSaving(true);
        try {
            const method = microsite._id ? 'PUT' : 'POST';
            const body = microsite._id
                ? { ...microsite, id: microsite._id }
                : microsite;

            const response = await fetch('/api/fwb-config/microsite', {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                const data = await response.json();
                setMicrosite(data.microsite);
                alert('Microsite saved successfully!');
            } else {
                alert('Failed to save microsite');
            }
        } catch (error) {
            console.error('Error saving microsite:', error);
            alert('Error saving microsite');
        } finally {
            setSaving(false);
        }
    };

    const publishMicrosite = async () => {
        if (!microsite._id) {
            alert('Please save the microsite first');
            return;
        }

        try {
            const response = await fetch('/api/fwb-config/microsite', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...microsite,
                    id: microsite._id,
                    isPublished: true
                })
            });

            if (response.ok) {
                alert('Microsite published successfully!');
                fetchMicrosite();
            } else {
                alert('Failed to publish microsite');
            }
        } catch (error) {
            console.error('Error publishing microsite:', error);
            alert('Error publishing microsite');
        }
    };

    const openPreviewInNewTab = () => {
        const previewWindow = window.open('', '_blank');
        previewWindow.document.write(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${STATIC_TITLE} - Microsite Preview</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
            min-height: 100vh;
            padding: 2rem 1rem;
          }
          .container { max-width: 400px; margin: 0 auto; }
          .header { text-align: center; margin-bottom: 2rem; }
          .icon { font-size: 4rem; margin-bottom: 1rem; }
          .title { font-size: 2rem; font-weight: bold; color: #1f2937; margin-bottom: 0.5rem; }
          .status { 
            display: inline-flex; 
            padding: 0.25rem 0.75rem; 
            font-size: 0.75rem; 
            font-weight: 600; 
            border-radius: 9999px; 
            background-color: #dcfce7; 
            color: #166534; 
          }
          .links { margin-bottom: 2rem; }
          .link {
            display: block;
            width: 100%;
            background: white;
            border: 1px solid #e5e7eb;
            border-radius: 0.75rem;
            padding: 1rem;
            margin-bottom: 1rem;
            text-align: center;
            text-decoration: none;
            color: #1f2937;
            font-weight: 500;
            transition: all 0.2s;
            cursor: pointer;
          }
          .link:hover {
            background: #f9fafb;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
          }
          .social { display: flex; justify-content: center; gap: 1.5rem; }
          .social-icon { 
            font-size: 2.5rem; 
            opacity: 0.8; 
            cursor: pointer;
            transition: all 0.2s;
          }
          .social-icon:hover { 
            opacity: 1; 
            transform: scale(1.1);
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="icon">${STATIC_ICON}</div>
            <h1 class="title">${STATIC_TITLE}</h1>
            ${microsite.isPublished ? '<span class="status">Published</span>' : ''}
          </div>
          <div class="links">
            ${microsite.links
                .sort((a, b) => a.order - b.order)
                .map(link => `
                <a href="${link.url.startsWith('http') ? link.url : 'https://' + link.url}" 
                   target="_blank" 
                   class="link">
                  ${link.title}
                </a>
              `).join('')}
          </div>
          ${Object.entries(microsite.socialMedia).some(([_, url]) => url) ? `
            <div class="social">
              ${Object.entries(microsite.socialMedia)
                    .filter(([_, url]) => url)
                    .map(([platform, url]) => {
                        let href = url;
                        if (platform === 'whatsapp' && !url.startsWith('https://wa.me/')) {
                            href = `https://wa.me/${url.replace(/[^0-9]/g, '')}`;
                        } else if (!url.startsWith('http')) {
                            href = `https://${url}`;
                        }
                        return `
                    <a href="${href}" target="_blank" class="social-icon">
                      ${socialIcons[platform]}
                    </a>
                  `;
                    }).join('')}
            </div>
          ` : ''}
        </div>
      </body>
      </html>
    `);
        previewWindow.document.close();
    };

    const handleLogout = async () => {
        try {
            await fetch('/api/auth/logout', { method: 'POST' });
            router.push('/login');
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const openRealMicrosite = () => {
        const micrositeUrl = 'https://links-fwb-plus.vercel.app'; // Replace with actual microsite URL
        window.open(micrositeUrl, '_blank');
    };

    const copyPublicAPI = () => {
        const apiUrl = `${window.location.origin}/api/public/microsite`;
        navigator.clipboard.writeText(apiUrl).then(() => {
            alert('Public API URL copied to clipboard!');
        }).catch(() => {
            const textArea = document.createElement('textarea');
            textArea.value = apiUrl;
            document.body.appendChild(textArea);
            textArea.select();
            document.execCommand('copy');
            document.body.removeChild(textArea);
            alert('Public API URL copied to clipboard!');
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg">Loading...</div>
            </div>
        );
    }

    if (!user) return null;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center space-x-4">
                            <button
                                onClick={() => router.push('/fwb-config')}
                                className="text-indigo-600 hover:text-indigo-500"
                            >
                                ← Back to Admin
                            </button>
                            <h1 className="text-xl font-semibold text-gray-900">
                                Microsite Builder
                            </h1>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-gray-700">Welcome, {user.username}</span>
                            <button
                                onClick={handleLogout}
                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Site Information</h3>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <div className="flex items-center space-x-3">
                                        <span className="text-3xl">{STATIC_ICON}</span>
                                        <div>
                                            <h4 className="text-lg font-semibold text-gray-900">{STATIC_TITLE}</h4>
                                            <p className="text-sm text-gray-600">Title and icon are fixed for consistency</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Links</h3>

                                <div className="space-y-3 mb-4">
                                    <input
                                        type="text"
                                        placeholder="Link title"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                        value={newLink.title}
                                        onChange={(e) => setNewLink({ ...newLink, title: e.target.value })}
                                    />
                                    <input
                                        type="url"
                                        placeholder="https://example.com"
                                        className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                        value={newLink.url}
                                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                                    />
                                    <button
                                        onClick={addLink}
                                        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                    >
                                        Add Link
                                    </button>
                                </div>

                                <DragDropContext onDragEnd={onDragEnd}>
                                    <Droppable droppableId="links">
                                        {(provided) => (
                                            <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                                                {microsite.links.map((link, index) => (
                                                    <Draggable key={link.id} draggableId={link.id} index={index}>
                                                        {(provided, snapshot) => (
                                                            <div
                                                                ref={provided.innerRef}
                                                                {...provided.draggableProps}
                                                                className={`p-3 border rounded-md bg-white ${snapshot.isDragging ? 'shadow-lg' : 'shadow-sm'
                                                                    }`}
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <div
                                                                        {...provided.dragHandleProps}
                                                                        className="cursor-move text-gray-400 hover:text-gray-600"
                                                                    >
                                                                        ⋮⋮
                                                                    </div>
                                                                    <div className="flex-1 space-y-2">
                                                                        <input
                                                                            type="text"
                                                                            value={link.title}
                                                                            onChange={(e) => updateLink(link.id, 'title', e.target.value)}
                                                                            className="w-full border-gray-300 rounded border p-1 text-sm"
                                                                        />
                                                                        <input
                                                                            type="url"
                                                                            value={link.url}
                                                                            onChange={(e) => updateLink(link.id, 'url', e.target.value)}
                                                                            className="w-full border-gray-300 rounded border p-1 text-sm"
                                                                        />
                                                                    </div>
                                                                    <button
                                                                        onClick={() => removeLink(link.id)}
                                                                        className="text-red-600 hover:text-red-800"
                                                                    >
                                                                        🗑️
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </Draggable>
                                                ))}
                                                {provided.placeholder}
                                            </div>
                                        )}
                                    </Droppable>
                                </DragDropContext>
                            </div>

                            <div className="bg-white shadow rounded-lg p-6">
                                <h3 className="text-lg font-medium text-gray-900 mb-4">Social Media Links</h3>

                                <div className="space-y-3">
                                    {Object.keys(socialIcons).map((platform) => (
                                        <div key={platform} className="flex items-center space-x-2">
                                            <span className="text-2xl">{socialIcons[platform]}</span>
                                            <input
                                                type="url"
                                                placeholder={`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`}
                                                className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 p-2 border"
                                                value={microsite.socialMedia[platform] || ''}
                                                onChange={(e) => updateSocialMedia(platform, e.target.value)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white shadow rounded-lg p-6">
                                <div className="space-y-3">
                                    <div className="flex space-x-3">
                                        <button
                                            onClick={saveMicrosite}
                                            disabled={saving}
                                            className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
                                        >
                                            {saving ? 'Saving...' : 'Save'}
                                        </button>
                                        <button
                                            onClick={publishMicrosite}
                                            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                                        >
                                            Publish
                                        </button>
                                    </div>

                                    <div className="pt-3 border-t border-gray-200">
                                        <p className="text-sm text-gray-600 mb-2">Public Access:</p>
                                        <div className="flex space-x-2">
                                            <button
                                                onClick={openRealMicrosite}
                                                disabled={!microsite.isPublished}
                                                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-1"
                                            >
                                                <span>🌐</span>
                                                <span>Open Live Site</span>
                                            </button>
                                            <button
                                                onClick={copyPublicAPI}
                                                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-1"
                                            >
                                                <span>📋</span>
                                                <span>Copy API URL</span>
                                            </button>
                                        </div>
                                        {!microsite.isPublished && (
                                            <p className="text-xs text-orange-600 mt-1">⚠️ Publish first to enable public access</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white shadow rounded-lg p-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-medium text-gray-900">Live Preview</h3>
                                <button
                                    onClick={openPreviewInNewTab}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center space-x-1"
                                >
                                    <span>🔗</span>
                                    <span>Open in New Tab</span>
                                </button>
                            </div>

                            <div className="border rounded-lg p-4 bg-gray-50 max-w-sm mx-auto">
                                <div className="text-center mb-6">
                                    <div className="text-4xl mb-2">{STATIC_ICON}</div>
                                    <h2 className="text-xl font-bold text-gray-900">{STATIC_TITLE}</h2>
                                    {microsite.isPublished && (
                                        <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800 mt-2">
                                            Published
                                        </span>
                                    )}
                                </div>

                                <div className="space-y-3 mb-6">
                                    {microsite.links
                                        .sort((a, b) => a.order - b.order)
                                        .map((link) => (
                                            <div
                                                key={link.id}
                                                className="block w-full bg-white hover:bg-gray-50 border border-gray-200 rounded-lg p-3 text-center text-gray-900 font-medium cursor-pointer"
                                            >
                                                {link.title}
                                            </div>
                                        ))}
                                </div>

                                {Object.entries(microsite.socialMedia).some(([_, url]) => url) && (
                                    <div className="flex justify-center space-x-4">
                                        {Object.entries(microsite.socialMedia).map(([platform, url]) =>
                                            url ? (
                                                <span key={platform} className="text-2xl opacity-80">
                                                    {socialIcons[platform]}
                                                </span>
                                            ) : null
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}