// All widget CSS lives here, scoped inside the shadow root — never touches host page styles.
export const STYLES = `
  :host { all: initial; }
  * { box-sizing: border-box; font-family: -apple-system, system-ui, sans-serif; }

  .launcher {
    position: fixed; bottom: 20px; right: 20px;
    width: 56px; height: 56px; border-radius: 50%;
    background: #1d9e75; color: #fff; border: none; cursor: pointer;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 14px rgba(0,0,0,0.25); z-index: 2147483000;
    font-size: 24px;
  }

  .panel {
    position: fixed; bottom: 88px; right: 20px;
    width: 340px; max-height: 480px; height: 480px;
    background: #14141f; border: 1px solid #262637; border-radius: 12px;
    display: none; flex-direction: column; overflow: hidden;
    box-shadow: 0 8px 30px rgba(0,0,0,0.35); z-index: 2147483000;
  }
  .panel.open { display: flex; }

  .header {
    padding: 12px 14px; background: #0f0f1a; color: #fff;
    font-size: 14px; font-weight: 600; border-bottom: 1px solid #262637;
  }

  .messages {
    flex: 1; overflow-y: auto; padding: 12px; display: flex;
    flex-direction: column; gap: 8px;
  }

  .msg {
    max-width: 80%; padding: 8px 10px; border-radius: 10px;
    font-size: 13px; line-height: 1.4; white-space: pre-wrap;
  }
  .msg.user { align-self: flex-end; background: #1d9e75; color: #fff; }
  .msg.assistant { align-self: flex-start; background: #262637; color: #f2f2f6; }

  .composer {
    display: flex; gap: 6px; padding: 10px; border-top: 1px solid #262637;
  }
  .composer input {
    flex: 1; background: #0f0f1a; border: 1px solid #262637; border-radius: 8px;
    color: #fff; padding: 8px 10px; font-size: 13px; outline: none;
  }
  .composer button {
    background: #1d9e75; color: #fff; border: none; border-radius: 8px;
    padding: 8px 12px; font-size: 13px; cursor: pointer;
  }
  .composer button:disabled { opacity: 0.5; cursor: default; }
`;
