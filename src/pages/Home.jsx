import './Home.css'; // For styling
import doctor_img from '../assets/doctor.jpg';

const Home = () => {
  return (
    <div className="home-page">
      {/* Main Header */}
      <header className="main-header">
        <h1>Hospital Management</h1>
        <p>Efficiently Manage Staff and Pharmacists</p>
      </header>

      {/* Doctor Image Section */}
      <section className="doctor-image">
        <img 
          src={doctor_img} // Add actual doctor image URL here
          alt="Doctor" 
          className="doctor-photo" 
        />
      </section>

      {/* Main Purpose of the Website */}
      <section className="purpose">
        <h2>Manage with Ease</h2>
        <div className="purpose-cards">
          <div className="card">
            <h3>Manage Staff</h3>
            <p>Manage your hospital staff efficiently with ease. Keep track of staff details, roles, and more.</p>
          </div>
          <div className="card">
            <h3>Manage Pharmacists</h3>
            <p>Oversee the pharmacists in your hospital, manage their shifts, and ensure smooth operations.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>Built by Ramprasad ❤️</p>
      </footer>
    </div>
  );
};

export default Home;
