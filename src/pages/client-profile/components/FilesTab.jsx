import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const FilesTab = ({ client }) => {
  const [selectedFolder, setSelectedFolder] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  const folders = [
    { id: 'all', name: 'All Files', count: 24, icon: 'FolderOpen' },
    { id: 'sessions', name: 'Session Recordings', count: 12, icon: 'Video' },
    { id: 'documents', name: 'Documents', count: 8, icon: 'FileText' },
    { id: 'assessments', name: 'Assessments', count: 4, icon: 'ClipboardList' }
  ];

  const files = [
    {
      id: 1,
      name: 'Session Recording - Leadership Development.mp4',
      type: 'video',
      size: '245 MB',
      uploadDate: '2025-01-28',
      category: 'sessions',
      thumbnail: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
      description: 'Video recording of leadership coaching session focusing on team management strategies'
    },
    {
      id: 2,
      name: 'DISC Assessment Results.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploadDate: '2025-01-25',
      category: 'assessments',
      description: 'Comprehensive DISC personality assessment results and analysis'
    },
    {
      id: 3,
      name: 'Goal Setting Worksheet.docx',
      type: 'document',
      size: '1.1 MB',
      uploadDate: '2025-01-22',
      category: 'documents',
      description: 'SMART goals framework worksheet with client responses'
    },
    {
      id: 4,
      name: 'Session Recording - Time Management.mp4',
      type: 'video',
      size: '198 MB',
      uploadDate: '2025-01-21',
      category: 'sessions',
      thumbnail: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=400&h=300&fit=crop',
      description: 'Coaching session on productivity techniques and time blocking strategies'
    },
    {
      id: 5,
      name: 'Coaching Agreement.pdf',
      type: 'pdf',
      size: '1.8 MB',
      uploadDate: '2025-01-14',
      category: 'documents',
      description: 'Signed coaching agreement and terms of engagement'
    },
    {
      id: 6,
      name: 'Initial Assessment Audio.mp3',
      type: 'audio',
      size: '45 MB',
      uploadDate: '2025-01-14',
      category: 'sessions',
      description: 'Audio recording of initial client assessment and intake session'
    },
    {
      id: 7,
      name: 'Leadership Style Assessment.xlsx',
      type: 'spreadsheet',
      size: '856 KB',
      uploadDate: '2025-01-12',
      category: 'assessments',
      description: 'Leadership style evaluation with scoring matrix and recommendations'
    },
    {
      id: 8,
      name: 'Progress Report - Q1.pdf',
      type: 'pdf',
      size: '3.2 MB',
      uploadDate: '2025-01-10',
      category: 'documents',
      description: 'Quarterly progress report with goal achievements and next steps'
    }
  ];

  const getFileIcon = (type) => {
    switch (type) {
      case 'video':
        return 'Video';
      case 'audio':
        return 'Music';
      case 'pdf':
        return 'FileText';
      case 'document':
        return 'FileText';
      case 'spreadsheet':
        return 'FileSpreadsheet';
      case 'image':
        return 'Image';
      default:
        return 'File';
    }
  };

  const getFileColor = (type) => {
    switch (type) {
      case 'video':
        return 'text-blue-600';
      case 'audio':
        return 'text-purple-600';
      case 'pdf':
        return 'text-red-600';
      case 'document':
        return 'text-blue-600';
      case 'spreadsheet':
        return 'text-green-600';
      case 'image':
        return 'text-pink-600';
      default:
        return 'text-muted-foreground';
    }
  };

  const filteredFiles = files.filter(file => {
    const matchesFolder = selectedFolder === 'all' || file.category === selectedFolder;
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         file.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFolder && matchesSearch;
  });

  const formatFileSize = (size) => {
    return size;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Client Files</h3>
          <p className="text-sm text-muted-foreground">Manage session recordings, documents, and assessments</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" iconName="Upload" size="sm">
            Upload File
          </Button>
          <Button variant="default" iconName="FolderPlus" size="sm">
            New Folder
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar - Folders */}
        <div className="lg:col-span-1">
          <div className="bg-card border border-border rounded-lg p-4">
            <h4 className="font-medium text-foreground mb-4">Folders</h4>
            <div className="space-y-1">
              {folders.map((folder) => (
                <button
                  key={folder.id}
                  onClick={() => setSelectedFolder(folder.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-md text-left transition-colors duration-200 ${
                    selectedFolder === folder.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={folder.icon} size={16} />
                    <span className="text-sm font-medium">{folder.name}</span>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedFolder === folder.id
                      ? 'bg-primary-foreground/20 text-primary-foreground'
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    {folder.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Storage Info */}
            <div className="mt-6 pt-4 border-t border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground">Storage Used</span>
                <span className="text-sm font-medium text-foreground">2.1 GB / 5 GB</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-4">
          {/* Search and View Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1 max-w-md">
              <Input
                type="search"
                placeholder="Search files..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                iconName="Grid3X3"
                onClick={() => setViewMode('grid')}
              />
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                iconName="List"
                onClick={() => setViewMode('list')}
              />
            </div>
          </div>

          {/* Files Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredFiles.map((file) => (
                <div key={file.id} className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      file.type === 'video' ? 'bg-blue-100' :
                      file.type === 'audio' ? 'bg-purple-100' :
                      file.type === 'pdf' ? 'bg-red-100' :
                      file.type === 'document' ? 'bg-blue-100' :
                      file.type === 'spreadsheet'? 'bg-green-100' : 'bg-muted'
                    }`}>
                      <Icon name={getFileIcon(file.type)} size={20} className={getFileColor(file.type)} />
                    </div>
                    <Button variant="ghost" size="icon" className="w-8 h-8">
                      <Icon name="MoreVertical" size={16} />
                    </Button>
                  </div>
                  
                  {file.thumbnail && (
                    <div className="mb-3">
                      <img
                        src={file.thumbnail}
                        alt={file.name}
                        className="w-full h-24 object-cover rounded-md"
                      />
                    </div>
                  )}
                  
                  <h5 className="font-medium text-foreground mb-1 line-clamp-2">{file.name}</h5>
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{file.description}</p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span>{formatFileSize(file.size)}</span>
                    <span>{formatDate(file.uploadDate)}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-3">
                    <Button variant="outline" size="sm" fullWidth iconName="Download">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-muted">
                    <tr>
                      <th className="text-left p-4 font-medium text-foreground">Name</th>
                      <th className="text-left p-4 font-medium text-foreground">Size</th>
                      <th className="text-left p-4 font-medium text-foreground">Modified</th>
                      <th className="text-left p-4 font-medium text-foreground">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <tr key={file.id} className="border-t border-border hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-8 h-8 rounded flex items-center justify-center ${
                              file.type === 'video' ? 'bg-blue-100' :
                              file.type === 'audio' ? 'bg-purple-100' :
                              file.type === 'pdf' ? 'bg-red-100' :
                              file.type === 'document' ? 'bg-blue-100' :
                              file.type === 'spreadsheet'? 'bg-green-100' : 'bg-muted'
                            }`}>
                              <Icon name={getFileIcon(file.type)} size={16} className={getFileColor(file.type)} />
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{file.name}</p>
                              <p className="text-sm text-muted-foreground">{file.description}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 text-sm text-muted-foreground">{formatFileSize(file.size)}</td>
                        <td className="p-4 text-sm text-muted-foreground">{formatDate(file.uploadDate)}</td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" iconName="Download">
                              Download
                            </Button>
                            <Button variant="ghost" size="sm" iconName="MoreHorizontal">
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {filteredFiles.length === 0 && (
            <div className="bg-card border border-border rounded-lg p-12 text-center">
              <Icon name="FileX" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No Files Found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery ? 'No files match your search criteria.' : 'No files in this folder yet.'}
              </p>
              <Button variant="default" iconName="Upload">
                Upload First File
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FilesTab;