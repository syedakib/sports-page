import React from 'react';

const Toggle = ({ checked, onChange }) => (
  <label className="switcher1-label" style={{ cursor: 'pointer' }}>
    <div className="switcher1-relative" style={{ position: 'relative' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="switcher1-checkbox"
        style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
      />
      <div
        className="switcher1-bg"
        style={{
          height: '32px',
          width: '56px',
          borderRadius: '9999px',
          background: checked ? '#2196F3' : '#E5E7EB',
          transition: 'background 0.3s'
        }}
      ></div>
      <div
        className="switcher1-dot"
        style={{
          position: 'absolute',
          left: checked ? '28px' : '4px',
          top: '4px',
          height: '24px',
          width: '24px',
          borderRadius: '50%',
          background: 'white',
          transition: 'left 0.3s'
        }}
      ></div>
    </div>
  </label>
);

export default Toggle;