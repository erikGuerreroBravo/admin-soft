import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'seph-form-layout',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="form-layout-page">
      <div class="form-grid">
        <div class="form-column">
          <section class="admin-card">
            <h2>Vertical</h2>
            <div class="field-stack">
              <label for="vertical-name">Name</label>
              <input id="vertical-name" class="form-control admin-input" type="text">
            </div>
            <div class="field-stack">
              <label for="vertical-email">Email</label>
              <input id="vertical-email" class="form-control admin-input" type="email">
            </div>
            <div class="field-stack">
              <label for="vertical-age">Age</label>
              <input id="vertical-age" class="form-control admin-input" type="number">
            </div>
          </section>

          <section class="admin-card">
            <h2>Vertical Grid</h2>
            <div class="row g-3">
              <div class="col-12 col-md-6">
                <label for="grid-name">Name</label>
                <input id="grid-name" class="form-control admin-input" type="text">
              </div>
              <div class="col-12 col-md-6">
                <label for="grid-email">Email</label>
                <input id="grid-email" class="form-control admin-input" type="email">
              </div>
            </div>
          </section>
        </div>

        <div class="form-column">
          <section class="admin-card">
            <h2>Horizontal</h2>
            <div class="horizontal-field">
              <label for="horizontal-name">Name</label>
              <input id="horizontal-name" class="form-control admin-input" type="text">
            </div>
            <div class="horizontal-field">
              <label for="horizontal-email">Email</label>
              <input id="horizontal-email" class="form-control admin-input" type="email">
            </div>
          </section>

          <section class="admin-card inline-card">
            <h2>Inline</h2>
            <form class="inline-form" (ngSubmit)="$event.preventDefault()">
              <input class="form-control admin-input" type="text" placeholder="Firstname" aria-label="Firstname">
              <input class="form-control admin-input" type="text" placeholder="Lastname" aria-label="Lastname">
              <button class="btn submit-btn" type="submit">Submit</button>
            </form>
          </section>

          <section class="admin-card help-card">
            <h2>Help Text</h2>
            <label for="username">Username</label>
            <input id="username" class="form-control admin-input" type="text">
            <p class="help-text">Enter your username to reset your password.</p>
          </section>
        </div>

        <section class="admin-card advanced-card">
          <h2>Advanced</h2>
          <div class="row g-3">
            <div class="col-12 col-lg-6">
              <label for="first-name">Firstname</label>
              <input id="first-name" class="form-control admin-input" type="text">
            </div>
            <div class="col-12 col-lg-6">
              <label for="last-name">Lastname</label>
              <input id="last-name" class="form-control admin-input" type="text">
            </div>
            <div class="col-12">
              <label for="address">Address</label>
              <textarea id="address" class="form-control admin-input admin-textarea"></textarea>
            </div>
            <div class="col-12 col-lg-6">
              <label for="state">State</label>
              <select id="state" class="form-select admin-input">
                <option selected>Select One</option>
                <option>Arizona</option>
                <option>California</option>
                <option>Texas</option>
              </select>
            </div>
            <div class="col-12 col-lg-6">
              <label for="zip">Zip</label>
              <input id="zip" class="form-control admin-input" type="text">
            </div>
          </div>
        </section>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormLayoutComponent {}
