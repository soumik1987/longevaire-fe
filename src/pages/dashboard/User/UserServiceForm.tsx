// src/pages/dashboard/User/UserServiceForm.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../../components/Layout/DashboardLayout';
import { ArrowLeft, Image as ImageIcon, Trash2, Save, Send, X } from 'lucide-react';
import '../../../styles/ServiceForm.css';

interface ServiceFormData {
  name: string;
  location: string;
  category: string;
  description: string;
  detailedDescription: string;
  duration: string;
  price: string;
  status: 'active' | 'inactive' | 'pending' | 'draft';
  images: File[];
  previewImages: string[];
  includes: {
    title: string;
    description: string;
  }[];
  bookingOptions: {
    availableDates: string[];
    pricePerPerson: string;
  };
}

const UserServiceForm: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = !!id;
  
  const [formData, setFormData] = useState<ServiceFormData>({
    name: '',
    location: '',
    category: 'wellness',
    description: '',
    detailedDescription: '',
    duration: '',
    price: '',
    status: 'draft',
    images: [],
    previewImages: [],
    includes: [{ title: '', description: '' }],
    bookingOptions: {
      availableDates: [],
      pricePerPerson: ''
    }
  });

  useEffect(() => {
    if (isEditing) {
      // Mock data - replace with actual API call
      const mockService = {
        name: 'Metabolic Reset',
        location: 'Aspen - USA',
        category: 'wellness',
        description: 'Optimize your metabolism and reset your body\'s natural rhythms.',
        detailedDescription: 'This comprehensive program focuses on metabolic health through advanced testing, personalized nutrition plans, and guided fitness routines in the beautiful surroundings of Aspen.',
        duration: '6 Days / 5 Nights',
        price: '$3,900',
        status: 'active',
        images: [],
        previewImages: ['https://images.pexels.com/photos/3825587/pexels-photo-3825587.jpeg'],
        includes: [
          { title: 'Metabolic rate testing', description: 'Track how efficiently your body burns calories.' },
          { title: 'Glucose and insulin monitoring', description: 'Daily tracking for metabolic clarity.' },
          { title: 'Nutrition plans for balance', description: 'Whole-food diets to stabilize blood sugar.' }
        ],
        bookingOptions: {
          availableDates: ['2025-08-22', '2025-10-18', '2025-12-01'],
          pricePerPerson: '$3,900'
        }
      };
      setFormData(mockService as any);
    }
  }, [id, isEditing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIncludeChange = (index: number, field: 'title' | 'description', value: string) => {
    const newIncludes = [...formData.includes];
    newIncludes[index][field] = value;
    setFormData(prev => ({ ...prev, includes: newIncludes }));
  };

  const addIncludeItem = () => {
    setFormData(prev => ({
      ...prev,
      includes: [...prev.includes, { title: '', description: '' }]
    }));
  };

  const removeIncludeItem = (index: number) => {
    const newIncludes = [...formData.includes];
    newIncludes.splice(index, 1);
    setFormData(prev => ({ ...prev, includes: newIncludes }));
  };

  const handleDateChange = (index: number, value: string) => {
    const newDates = [...formData.bookingOptions.availableDates];
    newDates[index] = value;
    setFormData(prev => ({
      ...prev,
      bookingOptions: {
        ...prev.bookingOptions,
        availableDates: newDates
      }
    }));
  };

  const addDate = () => {
    setFormData(prev => ({
      ...prev,
      bookingOptions: {
        ...prev.bookingOptions,
        availableDates: [...prev.bookingOptions.availableDates, '']
      }
    }));
  };

  const removeDate = (index: number) => {
    const newDates = [...formData.bookingOptions.availableDates];
    newDates.splice(index, 1);
    setFormData(prev => ({
      ...prev,
      bookingOptions: {
        ...prev.bookingOptions,
        availableDates: newDates
      }
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newImages = [...formData.images, ...files];
      const newPreviewImages = files.map(file => URL.createObjectURL(file));
      
      setFormData(prev => ({
        ...prev,
        images: newImages,
        previewImages: [...prev.previewImages, ...newPreviewImages]
      }));
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    const newPreviewImages = [...formData.previewImages];
    
    newImages.splice(index, 1);
    newPreviewImages.splice(index, 1);
    
    setFormData(prev => ({
      ...prev,
      images: newImages,
      previewImages: newPreviewImages
    }));
  };

  const handleSubmit = (action: 'submit' | 'draft' | 'delete') => {
    if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this program?')) {
        navigate('/dashboard/user/services');
      }
      return;
    }
    
    const status = action === 'submit' ? 'pending' : 'draft';
    const updatedFormData = { ...formData, status };
    
    alert(`Program ${action === 'submit' ? 'submitted for approval' : 'saved as draft'}`);
    console.log('Submitting:', updatedFormData);
    navigate('/dashboard/user/services');
  };

  return (
    <DashboardLayout role="user">
      <div className="service-form-container">
        <div className="form-header">
          <button className="back-button" onClick={() => navigate('/dashboard/user/services')}>
            <ArrowLeft size={20} />
          </button>
          <h1>{isEditing ? 'EDIT PROGRAM' : 'ADD NEW PROGRAM'}</h1>
        </div>
        
        <div className="form-content">
          <div className="form-section">
            <h2>Basic Information</h2>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="name">Program Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Enter program name"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="location">Location</label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Enter location (e.g., Aspen - USA)"
                />
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="duration">Duration</label>
                <input
                  type="text"
                  id="duration"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  placeholder="e.g., 6 Days / 5 Nights"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="price">Price</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., $3,900"
                />
              </div>
            </div>
            
            <div className="form-group">
              <label htmlFor="category">Category</label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleInputChange}
              >
                <option value="wellness">Wellness</option>
                <option value="detox">Detox</option>
                <option value="fitness">Fitness</option>
                <option value="spa">Spa</option>
                <option value="yoga">Yoga & Meditation</option>
                <option value="nutrition">Nutrition</option>
              </select>
            </div>
            
            <div className="form-group">
              <label htmlFor="description">Short Description</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Brief description that appears on cards"
                rows={3}
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="detailedDescription">Detailed Description</label>
              <textarea
                id="detailedDescription"
                name="detailedDescription"
                value={formData.detailedDescription}
                onChange={handleInputChange}
                placeholder="Full description of the program"
                rows={5}
              />
            </div>
          </div>
          
          <div className="form-section">
            <h2>Program Includes</h2>
            {formData.includes.map((include, index) => (
              <div key={index} className="include-item">
                <div className="form-row">
                  <div className="form-group">
                    <label>Title</label>
                    <input
                      type="text"
                      value={include.title}
                      onChange={(e) => handleIncludeChange(index, 'title', e.target.value)}
                      placeholder="e.g., Metabolic rate testing"
                    />
                  </div>
                  <button 
                    type="button" 
                    className="remove-button"
                    onClick={() => removeIncludeItem(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    value={include.description}
                    onChange={(e) => handleIncludeChange(index, 'description', e.target.value)}
                    placeholder="Description of what this includes"
                    rows={2}
                  />
                </div>
              </div>
            ))}
            <button 
              type="button" 
              className="add-button"
              onClick={addIncludeItem}
            >
              + Add Another Inclusion
            </button>
          </div>
          
          <div className="form-section">
            <h2>Booking Options</h2>
            <div className="form-group">
              <label>Price Per Person</label>
              <input
                type="text"
                value={formData.bookingOptions.pricePerPerson}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  bookingOptions: {
                    ...prev.bookingOptions,
                    pricePerPerson: e.target.value
                  }
                }))}
                placeholder="e.g., $3,900"
              />
            </div>
            
            <div className="form-group">
              <label>Available Dates</label>
              {formData.bookingOptions.availableDates.map((date, index) => (
                <div key={index} className="form-row">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => handleDateChange(index, e.target.value)}
                  />
                  <button 
                    type="button" 
                    className="remove-button"
                    onClick={() => removeDate(index)}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                className="add-button"
                onClick={addDate}
              >
                + Add Another Date
              </button>
            </div>
          </div>
          
          <div className="form-section">
            <h2>Images</h2>
            <div className="image-upload-container">
              <label htmlFor="images" className="image-upload-label">
                <ImageIcon size={24} />
                <span>Upload Images</span>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageUpload}
                  multiple
                  accept="image/*"
                  style={{ display: 'none' }}
                />
              </label>
              
              <div className="image-preview-container">
                {formData.previewImages.map((img, index) => (
                  <div key={index} className="image-preview">
                    <img src={img} alt={`Preview ${index}`} />
                    <button 
                      className="remove-image-button"
                      onClick={() => removeImage(index)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="form-actions">
            {isEditing && (
              <button 
                className="delete-button"
                onClick={() => handleSubmit('delete')}
              >
                <Trash2 size={16} />
                Delete Program
              </button>
            )}
            
            <div className="save-actions">
              <button 
                className="draft-button"
                onClick={() => handleSubmit('draft')}
              >
                <Save size={16} />
                Save as Draft
              </button>
              <button 
                className="submit-button"
                onClick={() => handleSubmit('submit')}
              >
                <Send size={16} />
                Submit for Approval
              </button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserServiceForm;