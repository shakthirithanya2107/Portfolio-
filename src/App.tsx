import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Home, Code, Award, FolderGit2, FileText, Settings, Save, Plus, Trash2, Upload, Download, Image as ImageIcon } from 'lucide-react';

// Storage utilities
const storage = {
  getData: () => {
    const stored = localStorage.getItem('portfolio_data');
    return stored ? JSON.parse(stored) : getDefaultData();
  },
  saveData: (data: any) => {
    localStorage.setItem('portfolio_data', JSON.stringify(data));
    window.dispatchEvent(new Event('storage'));
  }
};

function getDefaultData() {
  return {
    about: {
      name: "Your Name",
      title: "Full Stack Developer",
      bio: "Welcome to my portfolio! Use the Admin Console (⚙️) to customize this content.",
      email: "your.email@example.com",
      phone: "+1 234 567 8900",
      location: "Your City, Country",
      image: "",
      social: {
        github: "https://github.com/yourusername",
        linkedin: "https://linkedin.com/in/yourusername",
        twitter: "https://twitter.com/yourusername"
      }
    },
    skills: [],
    activities: [],
    projects: [],
    resume: { url: "", lastUpdated: new Date().toISOString() }
  };
}

// Pages
function About() {
  const [data, setData] = useState(storage.getData().about);

  useEffect(() => {
    const handleStorage = () => setData(storage.getData().about);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="glass rounded-3xl p-12 hover-lift">
          {data.image && (
            <div className="w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden glass">
              <img src={data.image} alt={data.name} className="w-full h-full object-cover" />
            </div>
          )}
          <h1 className="text-6xl font-bold text-gradient mb-4 text-center">{data.name}</h1>
          <h2 className="text-2xl font-semibold text-purple-600 mb-6 text-center">{data.title}</h2>
          <p className="text-lg text-gray-700 mb-8">{data.bio}</p>

          <div className="grid md:grid-cols-3 gap-4 mt-8">
            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600">Email</div>
              <div className="font-semibold">{data.email}</div>
            </div>
            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600">Phone</div>
              <div className="font-semibold">{data.phone}</div>
            </div>
            <div className="glass-dark rounded-xl p-4 text-center">
              <div className="text-sm text-gray-600">Location</div>
              <div className="font-semibold">{data.location}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Skills() {
  const [skills, setSkills] = useState(storage.getData().skills);

  useEffect(() => {
    const handleStorage = () => setSkills(storage.getData().skills);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-gradient mb-12 text-center">My Skills</h1>
        {skills.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-lg text-gray-700">Add your skills in the Admin Console!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {skills.map((skill: any) => (
              <div key={skill.id} className="glass rounded-3xl p-6 hover-lift">
                <div className="text-4xl mb-4 text-center">{skill.icon}</div>
                <h3 className="text-xl font-bold text-center mb-2">{skill.name}</h3>
                <div className="text-center text-sm text-gray-600 mb-3">{skill.category}</div>
                <div className="h-2 bg-white bg-opacity-30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pastel-pink to-pastel-lavender"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <div className="text-center mt-2 font-bold text-purple-600">{skill.level}%</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Activities() {
  const [activities, setActivities] = useState(storage.getData().activities);

  useEffect(() => {
    const handleStorage = () => setActivities(storage.getData().activities);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-gradient mb-12 text-center">Activities & Achievements</h1>
        {activities.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-lg text-gray-700">Add your activities in the Admin Console!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {activities.map((activity: any) => (
              <div key={activity.id} className="glass rounded-3xl p-6 hover-lift">
                <h3 className="text-2xl font-bold text-purple-700 mb-2">{activity.title}</h3>
                <div className="text-sm text-gray-600 mb-3">{new Date(activity.date).toLocaleDateString()}</div>
                <p className="text-gray-700">{activity.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Projects() {
  const [projects, setProjects] = useState(storage.getData().projects);

  useEffect(() => {
    const handleStorage = () => setProjects(storage.getData().projects);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-gradient mb-12 text-center">My Projects</h1>
        {projects.length === 0 ? (
          <div className="glass rounded-3xl p-8 text-center">
            <p className="text-lg text-gray-700">Add your projects in the Admin Console!</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project: any) => (
              <div key={project.id} className="glass rounded-3xl overflow-hidden hover-lift">
                {project.image && (
                  <div className="h-48 bg-gradient-to-br from-pastel-pink to-pastel-lavender">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-purple-700 mb-2">{project.title}</h3>
                  <p className="text-gray-700 mb-4 text-sm">{project.description}</p>
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 text-sm font-semibold">
                      View on GitHub →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Resume() {
  const [resume, setResume] = useState(storage.getData().resume);

  useEffect(() => {
    const handleStorage = () => setResume(storage.getData().resume);
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleDownload = () => {
    if (resume.url) {
      const link = document.createElement('a');
      link.href = resume.url;
      link.download = 'resume.pdf';
      link.click();
    } else {
      alert('Please upload a resume in the Admin Console first!');
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-6xl font-bold text-gradient mb-12 text-center">My Resume</h1>
        <div className="glass rounded-3xl p-12 text-center">
          {resume.url ? (
            <>
              <button onClick={handleDownload} className="btn-primary inline-flex items-center gap-2">
                <Download size={20} />
                Download Resume
              </button>
              <p className="text-sm text-gray-600 mt-4">
                Last updated: {new Date(resume.lastUpdated).toLocaleDateString()}
              </p>
            </>
          ) : (
            <p className="text-lg text-gray-700">Upload your resume in the Admin Console!</p>
          )}
        </div>
      </div>
    </div>
  );
}

// Admin Console Component
function Admin() {
  const [activeTab, setActiveTab] = useState('about');
  const [data, setData] = useState(storage.getData());

  const tabs = [
    { id: 'about', label: 'About', icon: Home },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'activities', label: 'Activities', icon: Award },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'resume', label: 'Resume', icon: FileText },
  ];

  const handleSave = () => {
    storage.saveData(data);
    alert('✅ Changes saved successfully!');
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `portfolio-data-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const imported = JSON.parse(event.target?.result as string);
          setData(imported);
          storage.saveData(imported);
          alert('✅ Data imported successfully!');
        } catch (error) {
          alert('❌ Failed to import data. Please check the file format.');
        }
      };
      reader.readAsText(file);
    }
  };

  const handleImageUpload = (field: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === 'about.image') {
          setData({ ...data, about: { ...data.about, image: reader.result as string } });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-6xl font-bold text-gradient mb-8 text-center">Admin Console</h1>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button onClick={handleSave} className="btn-primary flex items-center gap-2">
            <Save size={18} />
            Save All Changes
          </button>
          <button onClick={handleExport} className="glass px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover-lift">
            <Download size={18} />
            Export Data
          </button>
          <label className="glass px-6 py-3 rounded-full font-semibold flex items-center gap-2 hover-lift cursor-pointer">
            <Upload size={18} />
            Import Data
            <input type="file" accept=".json" onChange={handleImport} className="hidden" />
          </label>
        </div>

        {/* Tabs */}
        <div className="glass rounded-3xl p-2 mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 min-w-[120px] px-6 py-4 rounded-2xl font-semibold flex items-center justify-center gap-2 transition-all ${activeTab === tab.id ? 'glass-dark text-purple-700' : 'hover:bg-white hover:bg-opacity-30'
                  }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Content */}
        <div className="glass rounded-3xl p-8">
          {activeTab === 'about' && (
            <AboutEditor data={data} setData={setData} onImageUpload={handleImageUpload} />
          )}
          {activeTab === 'skills' && (
            <SkillsEditor data={data} setData={setData} />
          )}
          {activeTab === 'activities' && (
            <ActivitiesEditor data={data} setData={setData} />
          )}
          {activeTab === 'projects' && (
            <ProjectsEditor data={data} setData={setData} />
          )}
          {activeTab === 'resume' && (
            <ResumeEditor data={data} setData={setData} />
          )}
        </div>
      </div>
    </div>
  );
}

// Editor Components
function AboutEditor({ data, setData, onImageUpload }: any) {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Edit About Section</h2>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">Profile Image</label>
        <div className="flex items-center gap-4">
          {data.about.image && (
            <div className="w-24 h-24 rounded-full overflow-hidden glass">
              <img src={data.about.image} alt="Profile" className="w-full h-full object-cover" />
            </div>
          )}
          <label className="btn-primary cursor-pointer flex items-center gap-2">
            <ImageIcon size={18} />
            Upload Image
            <input type="file" accept="image/*" onChange={(e) => onImageUpload('about.image', e)} className="hidden" />
          </label>
        </div>
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">Name</label>
        <input
          type="text"
          value={data.about.name}
          onChange={(e) => setData({ ...data, about: { ...data.about, name: e.target.value } })}
          className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">Title</label>
        <input
          type="text"
          value={data.about.title}
          onChange={(e) => setData({ ...data, about: { ...data.about, title: e.target.value } })}
          className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      <div>
        <label className="block font-semibold text-gray-700 mb-2">Bio</label>
        <textarea
          value={data.about.bio}
          onChange={(e) => setData({ ...data, about: { ...data.about, bio: e.target.value } })}
          rows={4}
          className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
        />
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={data.about.email}
            onChange={(e) => setData({ ...data, about: { ...data.about, email: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Phone</label>
          <input
            type="tel"
            value={data.about.phone}
            onChange={(e) => setData({ ...data, about: { ...data.about, phone: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div>
          <label className="block font-semibold text-gray-700 mb-2">Location</label>
          <input
            type="text"
            value={data.about.location}
            onChange={(e) => setData({ ...data, about: { ...data.about, location: e.target.value } })}
            className="w-full px-4 py-3 rounded-xl glass-dark focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
      </div>
    </div>
  );
}

function SkillsEditor({ data, setData }: any) {
  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: 'New Skill',
      level: 50,
      category: 'General',
      icon: '⭐'
    };
    setData({ ...data, skills: [...data.skills, newSkill] });
  };

  const updateSkill = (id: string, updates: any) => {
    setData({
      ...data,
      skills: data.skills.map((s: any) => s.id === id ? { ...s, ...updates } : s)
    });
  };

  const deleteSkill = (id: string) => {
    if (confirm('Delete this skill?')) {
      setData({ ...data, skills: data.skills.filter((s: any) => s.id !== id) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-700">Edit Skills</h2>
        <button onClick={addSkill} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {data.skills.map((skill: any) => (
        <div key={skill.id} className="glass-dark rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-purple-700">Skill</h3>
            <button onClick={() => deleteSkill(skill.id)} className="p-2 rounded-full hover:bg-red-100 text-red-600">
              <Trash2 size={18} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={skill.name}
                onChange={(e) => updateSkill(skill.id, { name: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Category</label>
              <input
                type="text"
                value={skill.category}
                onChange={(e) => updateSkill(skill.id, { category: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Icon (Emoji)</label>
              <input
                type="text"
                value={skill.icon}
                onChange={(e) => updateSkill(skill.id, { icon: e.target.value })}
                className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400 text-2xl text-center"
                maxLength={2}
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-2">Level: {skill.level}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={skill.level}
                onChange={(e) => updateSkill(skill.id, { level: parseInt(e.target.value) })}
                className="w-full"
              />
            </div>
          </div>
        </div>
      ))}

      {data.skills.length === 0 && (
        <div className="text-center py-12 glass-dark rounded-2xl">
          <p className="text-gray-600">No skills added yet. Click "Add Skill" to get started!</p>
        </div>
      )}
    </div>
  );
}

function ActivitiesEditor({ data, setData }: any) {
  const addActivity = () => {
    const newActivity = {
      id: Date.now().toString(),
      title: 'New Activity',
      description: 'Description',
      date: new Date().toISOString().split('T')[0]
    };
    setData({ ...data, activities: [...data.activities, newActivity] });
  };

  const updateActivity = (id: string, updates: any) => {
    setData({
      ...data,
      activities: data.activities.map((a: any) => a.id === id ? { ...a, ...updates } : a)
    });
  };

  const deleteActivity = (id: string) => {
    if (confirm('Delete this activity?')) {
      setData({ ...data, activities: data.activities.filter((a: any) => a.id !== id) });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-700">Edit Activities</h2>
        <button onClick={addActivity} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Activity
        </button>
      </div>

      {data.activities.map((activity: any) => (
        <div key={activity.id} className="glass-dark rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-purple-700">Activity</h3>
            <button onClick={() => deleteActivity(activity.id)} className="p-2 rounded-full hover:bg-red-100 text-red-600">
              <Trash2 size={18} />
            </button>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={activity.title}
              onChange={(e) => updateActivity(activity.id, { title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={activity.description}
              onChange={(e) => updateActivity(activity.id, { description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Date</label>
            <input
              type="date"
              value={activity.date}
              onChange={(e) => updateActivity(activity.id, { date: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>
        </div>
      ))}

      {data.activities.length === 0 && (
        <div className="text-center py-12 glass-dark rounded-2xl">
          <p className="text-gray-600">No activities added yet. Click "Add Activity" to get started!</p>
        </div>
      )}
    </div>
  );
}

function ProjectsEditor({ data, setData }: any) {
  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      title: 'New Project',
      description: 'Project description',
      image: '',
      githubLink: ''
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  };

  const updateProject = (id: string, updates: any) => {
    setData({
      ...data,
      projects: data.projects.map((p: any) => p.id === id ? { ...p, ...updates } : p)
    });
  };

  const deleteProject = (id: string) => {
    if (confirm('Delete this project?')) {
      setData({ ...data, projects: data.projects.filter((p: any) => p.id !== id) });
    }
  };

  const handleImageUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateProject(id, { image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-purple-700">Edit Projects</h2>
        <button onClick={addProject} className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {data.projects.map((project: any) => (
        <div key={project.id} className="glass-dark rounded-2xl p-6 space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-bold text-purple-700">Project</h3>
            <button onClick={() => deleteProject(project.id)} className="p-2 rounded-full hover:bg-red-100 text-red-600">
              <Trash2 size={18} />
            </button>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Project Image</label>
            <div className="flex items-center gap-4">
              {project.image && (
                <div className="w-32 h-24 rounded-xl overflow-hidden glass">
                  <img src={project.image} alt="Project" className="w-full h-full object-cover" />
                </div>
              )}
              <label className="btn-primary cursor-pointer flex items-center gap-2 text-sm">
                <ImageIcon size={16} />
                Upload
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(project.id, e)} className="hidden" />
              </label>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={project.title}
              onChange={(e) => updateProject(project.id, { title: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">Description</label>
            <textarea
              value={project.description}
              onChange={(e) => updateProject(project.id, { description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-2">GitHub Link</label>
            <input
              type="url"
              value={project.githubLink}
              onChange={(e) => updateProject(project.id, { githubLink: e.target.value })}
              className="w-full px-4 py-2 rounded-xl glass focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="https://github.com/..."
            />
          </div>
        </div>
      ))}

      {data.projects.length === 0 && (
        <div className="text-center py-12 glass-dark rounded-2xl">
          <p className="text-gray-600">No projects added yet. Click "Add Project" to get started!</p>
        </div>
      )}
    </div>
  );
}

function ResumeEditor({ data, setData }: any) {
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setData({
          ...data,
          resume: {
            url: reader.result as string,
            lastUpdated: new Date().toISOString()
          }
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold text-purple-700 mb-6">Edit Resume</h2>

      <div className="glass-dark rounded-2xl p-8 text-center space-y-6">
        <p className="text-gray-700">Upload your resume as a PDF or image file.</p>

        <label className="btn-primary cursor-pointer inline-flex items-center gap-2 text-lg">
          <Upload size={20} />
          Upload Resume
          <input type="file" accept=".pdf,image/*" onChange={handleFileUpload} className="hidden" />
        </label>

        {data.resume.url && (
          <div className="mt-6">
            <p className="text-sm text-green-600 font-semibold mb-2">✓ Resume uploaded successfully</p>
            <p className="text-sm text-gray-600">
              Last Updated: {new Date(data.resume.lastUpdated).toLocaleDateString()}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Navigation Component
function Navigation() {
  const location = useLocation();
  const navItems = [
    { path: '/', label: 'About', icon: Home },
    { path: '/skills', label: 'Skills', icon: Code },
    { path: '/activities', label: 'Activities', icon: Award },
    { path: '/projects', label: 'Projects', icon: FolderGit2 },
    { path: '/resume', label: 'Resume', icon: FileText },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto glass rounded-full px-8 py-4 flex items-center justify-between">
        <div className="text-2xl font-bold text-gradient">Portfolio</div>
        <div className="flex items-center gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <div className={`nav-link flex items-center gap-2 rounded-full px-4 py-2 ${isActive ? 'active glass-dark' : ''
                  }`}>
                  <Icon size={18} />
                  <span className="hidden md:inline">{item.label}</span>
                </div>
              </Link>
            );
          })}
          <Link to="/admin">
            <div className={`ml-4 p-2 rounded-full hover-lift ${location.pathname === '/admin' ? 'glass-dark' : 'glass'
              }`} title="Admin Console">
              <Settings size={20} />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

// Main App
function App() {
  return (
    <Router>
      <div className="relative min-h-screen">
        <div className="animated-bg" />
        <Navigation />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
